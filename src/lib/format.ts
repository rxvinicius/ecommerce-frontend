export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export const lastFourDigits = (value: string) => value.slice(-4);
