import { FormEvent, useContext, useState } from "react";
import ReactModal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { TransactionsContext } from "../../hooks";
import { TransactionCreate } from "../../models";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

type Props = Readonly<{
  isOpen: boolean;
  onRequestClose: () => void;
}>;

export function NewTransactionModal({ isOpen, onRequestClose }: Props) {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<TransactionCreate["type"]>("deposit");
  const { createTransaction } = useContext(TransactionsContext);

  async function handleCreateTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({ category, title, type, amount });
    setAmount(0);
    setCategory("");
    setTitle("");
    setType("deposit");
    onRequestClose();
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateTransaction}>
        <h2 className="title">Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(evt) => setAmount(Number(evt.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={(evt) => setCategory(evt.target.value)}
        />
        <button className="register">Cadastrar</button>
      </Container>
    </ReactModal>
  );
}
