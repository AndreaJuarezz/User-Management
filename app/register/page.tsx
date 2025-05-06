// app/register/page.tsx
import RegisterForm from "@/app/components/RegisterForm"; 

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <RegisterForm />
    </div>
  );
}
