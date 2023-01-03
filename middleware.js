import { NextFetchEvent, NextResponse } from "next/server";
import { getData } from "./pages/api/redirections";

export async function middleware(req, ev) {
  // If page is 200 OK! Skip the middleware
  const response = await fetch(req.nextUrl.href);
  if (response.status === 200) return NextResponse.next();

  const redirections = await getData();
  const redirect = await redirections.find(
    (redirect) => req.nextUrl.pathname === redirect.source
  );

  console.log(redirections);

  if (redirect && redirect?.status === "410") {
    return NextResponse.rewrite(new URL(redirect.destination, req.url));
  }

  if (redirect && redirect?.status !== "410") {
    return NextResponse.redirect(
      new URL(redirect.destination, req.url),
      parseInt(redirect.status)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|next.svg|thirteen.svg|vercel.svg|robots.txt|assets).*)",
  ],
};
