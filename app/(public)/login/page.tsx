import { UserLogin } from "@/features/auth/roles/user/login/UserLogin";
import { AuthBrand } from "@/features/auth/shared/AuthBrand";

export default function LoginPage() {
  return (
    <main className="page auth-page">
      <div className="auth-page-content">
        <AuthBrand />
        <UserLogin />
      </div>
    </main>
  );
}
