import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModalOpen";
import { GlobalStyle } from "./styles/global";

export function App() {
  const [isNewTransactionModalOpen, setIsNewTranscationModalOpen] = useState(false);
    function handleOpenNewTransactionModal () {
        setIsNewTranscationModalOpen(true)
    }
    function handleCloseNewTransactionModal () {
        setIsNewTranscationModalOpen(false)
    }
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
      <Dashboard/>
      <GlobalStyle/>
    </>
  );
}

