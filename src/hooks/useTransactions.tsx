import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TransactionCreate, TransactionRead } from "../models";
import { api } from "../services/api";

type Props = Readonly<{
  children: ReactNode;
}>;

type TransactionContextData = Readonly<{
  createTransaction: (transaction: TransactionCreate) => Promise<void>;
  transactions: readonly TransactionRead[];
}>;

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: Props) {
  const [transactions, setTransactions] = useState<readonly TransactionRead[]>(
    []
  );

  useEffect(() => {
    api
      .get<Record<"transactions", readonly TransactionRead[]>>("transactions")
      .then(({ data: { transactions } }) => setTransactions(transactions));
  }, []);

  async function createTransaction(transaction: TransactionCreate) {
    const response = await api.post<Record<"transaction", TransactionRead>>(
      "transactions",
      {
        ...transaction,
        createdAt: new Date(),
        id: Math.random(),
      }
    );
    setTransactions([...transactions, response.data.transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ createTransaction, transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
