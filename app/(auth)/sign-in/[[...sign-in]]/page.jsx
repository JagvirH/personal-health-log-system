import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center pt-24">
      <SignIn path="/sign-in" />
    </div>
  
);
}