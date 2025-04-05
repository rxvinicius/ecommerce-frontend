import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold leading-[140%] text-center">
        Faça login na sua conta
      </h1>
      <p className="text-gray-600 mb-6 leading-[140%] small-medium md:base-regular mt-2 text-center">
        Bem-vindo de volta! Insira os detalhes da sua conta
      </p>
      <LoginForm />
    </div>
  );
}
