import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = "JWT_SECRET_STRINGS";

export default function middleware(req) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  const url = req.url;

  if (url.includes("/login")) {
    if (jwt) {
      try {
        verify(jwt, secret);

        return NextResponse.redirect("/dashboard");
      } catch (e) {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  }

  if (url.includes("/dashboard")) {
    if (jwt === undefined) {
      return NextResponse.redirect("/login");
    }

    try {
     const user = verify(jwt, secret);

      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect("/login");
    }
  }

  return NextResponse.next();
}
