import { Container } from "./styles";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useContext } from "react";
import { useTransactions } from "../../hooks/useTransactions";


export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transactions) => {
      if (transactions.type === "deposit") {
        acc.deposits += transactions.amount;
        acc.total += transactions.amount;
      } else {
        acc.withdraw += transactions.amount;
        acc.total -= transactions.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraw: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
        {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(summary.deposits)}
          </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="Saidas" />
        </header>
        <strong>-  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(summary.withdraw)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong> {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(summary.total)}</strong>
      </div>
    </Container>
  );
}
