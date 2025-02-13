import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, userId } = body;

    if (!name || !userId) {
      return NextResponse.json(
        { error: "Name and userId are required" },
        { status: 400 }
      );
    }

    const newProject = await db
      .insert(projects)
      .values({
        name,
        description,
        userId,
      })
      .returning({
        id: projects.id,
      });
    return NextResponse.json(
      {
        message: "Project created successfully",
        projectId: newProject[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    const userProjects = await db.query.projects.findMany({
      where: (project) => eq(project.userId, userId),
    });

    return NextResponse.json(userProjects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
