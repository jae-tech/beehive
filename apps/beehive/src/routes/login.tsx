import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/features/auth";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return <LoginForm />;
}
