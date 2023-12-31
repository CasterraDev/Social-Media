import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)

      //if (request.nextUrl.pathname.startsWith("/admin")
      //    && request.nextauth.token?.role !== "admin"
      //    && request.nextauth.token?.role !== "manager") {
      //    return NextResponse.rewrite(
      //        new URL("/denied", request.url)
      //    )
      //}
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)
export const config = { matcher: ["/extra", "/notifications"]}
