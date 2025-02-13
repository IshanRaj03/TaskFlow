import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export async function middleware(req: CustomRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  try {
    const decoded = jwtDecode(token);
    req.user = decoded as JwtPayload;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/tasks/:path*", "/api/projects/:path*"],
};
