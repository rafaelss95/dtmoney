export function asCurrency(amount: number | bigint) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(amount);
}

export function asDate(date: Date | number | string) {
  return new Intl.DateTimeFormat("pt-BR").format(
    date ? new Date(date) : new Date()
  );
}
