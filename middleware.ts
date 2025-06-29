import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import path from "path";

export default withAuth(

    function middleware(){
        return NextResponse.next()
    },
    {
        callbacks:{
          authorized({req,token}){
             const {pathname}=req.nextUrl
             if(pathname.startsWith("/api/auth") || pathname=="/login" || pathname=="/register"){
                return true
             }

             if(pathname=="/"||pathname.startsWith("/api/videos")){
                return true
             }

             return !!token
          }
        }
    }
    
//     {
//   //Matches the pages config in `[...nextauth]`
//   pages: {
//     signIn: "/login",
//     error: "/error",
//   },
//   }
);

export const config = {
  matcher: [
    //    Match all request paths except:
    //     -  _next/static (static files)
    //     -  _next/image (image optimization files)
    //     -  favicon.ico (favicon file)
    //     -  public folder
    " /((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
