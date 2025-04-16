import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "@/components/ui/icons";

type ApiError = {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
  message?: string;
};

type ErrorInfoProps = {
  error: ApiError | null;
  context?: "login" | "signup";
};

const ErrorInfo = ({ error, context }: ErrorInfoProps) => {
  const getTranslatedMessage = () => {
    if (!error) return "Erro desconhecido";

    const errorType = error.response?.data?.error || error.message;

    switch (errorType) {
      case "Unauthorized":
        return "Email ou senha inválidos.";

      case "Conflict":
        return "E-mail já cadastrado";

      case "Bad Request":
        return context === "login"
          ? "Credenciais inválidas"
          : "Dados inválidos. Verifique as informações.";

      default:
        return context === "login"
          ? "Erro ao tentar login. Tente novamente mais tarde."
          : context === "signup"
          ? "Erro ao cadastrar. Tente novamente mais tarde."
          : "Ocorreu um erro. Tente novamente.";
    }
  };

  if (!error) return null;

  return (
    <Alert variant="destructive" className="text-center">
      <AlertDescription className="flex items-center justify-center gap-2">
        <AlertCircle className="icon" />
        {getTranslatedMessage()}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorInfo;
