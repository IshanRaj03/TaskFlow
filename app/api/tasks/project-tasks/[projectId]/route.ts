import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const projectTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, params.projectId));
    return NextResponse.json(projectTasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
