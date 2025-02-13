import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { and, eq, gte, isNull, lte } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, dueDate, priority, projectId, userId } = body;

    if (!title || !priority || !userId) {
      return NextResponse.json(
        { error: "Title, priority, and userId are required" },
        { status: 400 }
      );
    }

    const newTask = await db
      .insert(tasks)
      .values({
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        projectId: projectId || null,
        userId,
      })
      .returning({
        id: tasks.id,
      });

    return NextResponse.json(
      { message: "Task created successfully", taskId: newTask[0].id },
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
    const projectId = searchParams.get("projectId");
    const priority = searchParams.get("priority");
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const whereConditions = and(
      eq(tasks.userId, userId),
      projectId ? eq(tasks.projectId, projectId) : isNull(tasks.projectId),
      priority ? eq(tasks.priority, priority) : undefined,
      status ? eq(tasks.status, status) : undefined,
      startDate && endDate
        ? and(
            gte(tasks.dueDate, new Date(startDate)),
            lte(tasks.dueDate, new Date(endDate))
          )
        : undefined
    );

    const userTasks = await db.query.tasks.findMany({
      where: whereConditions,
    });

    return NextResponse.json(userTasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");
//     const projectId = searchParams.get("projectId");
//     const priority = searchParams.get("priority");
//     const status = searchParams.get("status");
//     const startDate = searchParams.get("startDate");
//     const endDate = searchParams.get("endDate");

//     if (!userId) {
//       return NextResponse.json(
//         { error: "userId is required" },
//         { status: 400 }
//       );
//     }

//     const whereConditions = and(
//       eq(tasks.userId, userId),
//       projectId ? eq(tasks.projectId, projectId) : isNull(tasks.projectId),
//       priority ? eq(tasks.priority, priority) : undefined,
//       status ? eq(tasks.status, status) : undefined,
//       startDate && endDate
//         ? and(
//             gte(tasks.dueDate, new Date(startDate)),
//             lte(tasks.dueDate, new Date(endDate))
//           )
//         : undefined
//     );

//     const userTasks = await db.query.tasks.findMany({
//       where: whereConditions,
//     });

//     const groupedTasks = userTasks.reduce((acc, task) => {
//       const date = task.dueDate?.toISOString().split("T")[0];
//       if (date) {
//         acc[date] = acc[date] || [];
//         acc[date].push(task);
//       }
//       return acc;
//     }, {} as Record<string, typeof userTasks>);

//     return NextResponse.json(groupedTasks, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }
