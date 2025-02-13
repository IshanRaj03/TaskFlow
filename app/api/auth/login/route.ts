import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    const user = await db.query.users.findFirst({
      where: (fields) => eq(fields.email, email),
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Email does not exists please signup",
        },
        {
          status: 401,
        }
      );
    }
    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          {
            error: "Invalid credentials",
          },
          {
            status: 401,
          }
        );
      }
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      {
        message: "User logged in successfully",
        token,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
