import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { asCurrency } from "../../formatters";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();
  const summary = transactions.reduce(
    (accumulator, currentValue) => {
      return {
        ...accumulator,
        ...(currentValue.type === "deposit"
          ? {
              deposits: accumulator.deposits + currentValue.amount,
              total: accumulator.total + currentValue.amount,
            }
          : {
              withdraws: accumulator.withdraws - currentValue.amount,
              total: accumulator.total - currentValue.amount,
            }),
      };
    },
    { deposits: 0, withdraws: 0, total: 0 }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{asCurrency(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>{asCurrency(summary.withdraws)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{asCurrency(summary.total)}</strong>
      </div>
    </Container>
  );
}
