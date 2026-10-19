import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho.jsx";
import Rodape from "./components/Rodape.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import { API_KEY, API_URL } from "./dados/api.js";
import Carrinho from "./components/Carrinho.jsx";

export default function App() {
  const [livros, setLivros] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    async function carregarLivros() {
      try {
        const resposta = await fetch(API_URL, {
          headers: { "x-api-key": API_KEY },
        });
        const dados = await resposta.json();
        setLivros(dados);
      } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
      }
    }

    carregarLivros();
  }, []);

  return (
    <>
      <Cabecalho onOpenCart={() => setCarrinhoAberto(true)} />
      
      <Catalogo livros={livros} />
      
      <Carrinho 
        carrinhoAberto={carrinhoAberto}
        setCarrinhoAberto={setCarrinhoAberto}
        carrinho={carrinho}
        setCarrinho={setCarrinho}
      />

      <Rodape />
    </>
  );
}