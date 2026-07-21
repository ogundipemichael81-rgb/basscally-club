import { LoginForm } from "@/components/auth/login-form";

/** Screen 03 */
export default async function AuthLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ authError?: string }>;
}) {
  const { authError } = await searchParams;
  return <LoginForm initialError={authError} />;
}
