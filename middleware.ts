import {NextResponse} from "next/server";
import {auth} from "./auth";

export default auth((req) => {
  if (!req.auth) {
    if (req.nextUrl.pathname !== "/login") {
      // Given an incoming request...
      const loginUrl = new URL("/login", req.url);
      // Add ?from=/incoming-url to the /login URL
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      // And redirect to the new URL
      return NextResponse.redirect(loginUrl);
    } else {
      return NextResponse.next();
    }
  }
});

export const config = {matcher: ["/dashboard/:path*"]};
