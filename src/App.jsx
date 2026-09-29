import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho.jsx";
import Rodape from "./components/Rodape.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import { API_KEY, API_URL } from "./dados/api.js";

export default function App() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    async function carregarLivros() {
      const resposta = await fetch(API_URL, {
        headers: { "x-api-key": API_KEY },
      });
      const dados = await resposta.json();
      setLivros(dados);
    }

    carregarLivros();
  }, []);

  return (
    <>
      <Cabecalho />
      <Catalogo livros={livros} />
      <Rodape />
    </>
  );
}
