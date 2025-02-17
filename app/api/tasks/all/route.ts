import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const standaloneTasks = await db.query.tasks.findMany({
      where: (task) => eq(task.userId, userId),
    });
    const allTasks = [...standaloneTasks];

    const projectData = await db.query.projects.findMany({
      where: (project) => eq(project.userId, userId),
    });
    // console.log("Project data:", projectData);

    const projectIds = projectData.map((project) => project.id);

    projectIds.forEach(async (projectId) => {
      const projectTasks = await db.query.tasks.findMany({
        where: (task) => eq(task.projectId, projectId),
      });
      allTasks.push(...projectTasks);
    });

    return NextResponse.json(allTasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
