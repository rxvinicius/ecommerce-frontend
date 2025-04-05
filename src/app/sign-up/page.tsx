import SignUpForm from "@/components/auth/SignupForm";

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold leading-[140%] text-center">
        Criar uma nova conta
      </h1>
      <p className="text-gray-600 mb-6 leading-[140%] small-medium md:base-regular mt-2 text-center">
        Crie uma conta e explore centenas de produtos
      </p>
      <SignUpForm />
    </div>
  );
}
