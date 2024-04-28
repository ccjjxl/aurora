import {NextResponse} from "next/server";
import {auth} from "./auth";

export default auth((req) => {
  if (!req.auth) {
    if (req.nextUrl.pathname !== "/login") {
      const reqOrigin = req.nextUrl.origin;
      return NextResponse.redirect(`${reqOrigin}/login?callbackUrl=${req.url}`);
    } else {
      return NextResponse.next();
    }
  }
});

export const config = {matcher: ["/dashboard/:path*"]};