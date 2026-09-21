import { UserSignup } from "@/features/auth/roles/user/signup/UserSignup";
import { AuthBrand } from "@/features/auth/shared/AuthBrand";

export default function SignupPage() {
  return (
    <main className="page auth-page">
      <div className="auth-page-content">
        <AuthBrand />
        <UserSignup />
      </div>
    </main>
  );
}
