import { asCurrency, asDate } from "../../formatters";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function Transactions() {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {transaction.type === "withdraw" ? "- " : ""}
                {asCurrency(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>{asDate(transaction.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
