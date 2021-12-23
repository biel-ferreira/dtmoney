import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type Transactions = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

type TransactionInput = {
  title: string;
  amount: number;
  type: string;
  category: string;
};

interface TransactionData {
  transactions: Transactions[];
  handleCreateNewTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionData>(
  {} as TransactionData
);

export const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function handleCreateNewTransaction(
    transactionInput: TransactionInput
  ) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([
        ...transactions, 
        transaction
    ]);
    console.log(transactions);
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, handleCreateNewTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions () {
  const context = useContext(TransactionsContext)

  return context;
}
