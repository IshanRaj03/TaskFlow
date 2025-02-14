import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const projectTasks = await db.select().from(tasks).where(eq(tasks.id, id));

    return NextResponse.json(projectTasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, dueDate, priority, projectId, status } = body;

    if (!title || !priority) {
      return NextResponse.json(
        { error: "Title and priority are required" },
        { status: 400 }
      );
    }

    await db
      .update(tasks)
      .set({
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        projectId: projectId || null,
        status,
      })
      .where(eq(tasks.id, id));

    return NextResponse.json(
      { message: "Task updated successfully", taskId: id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await db.delete(tasks).where(eq(tasks.id, id));
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
