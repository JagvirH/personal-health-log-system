import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publishableKey: "pk_test_YmVjb21pbmctY2FsZi00LmNsZXJrLmFjY291bnRzLmRldiQ",
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
