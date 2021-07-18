export type TransactionRead = Readonly<{
  amount: number;
  category: string;
  createdAt: string;
  id: number;
  title: string;
  type: "deposit" | "withdraw";
}>;

export type TransactionCreate = Pick<
  TransactionRead,
  "amount" | "category" | "title" | "type"
>;
