import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function Home() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
