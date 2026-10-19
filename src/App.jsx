import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho.jsx";
import Rodape from "./components/Rodape.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Carrinho from "./components/Carrinho.jsx";
import { API_KEY, API_URL } from "./dados/api.js";

export default function App() {
  const [livros, setLivros] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

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
  function adicionarAoCarrinho (livro) {
    setCarrinho((carrinhoAtual) => {
      const itemExistente = carrinhoAtual.find((item) => item.id === livro.id);

      if (itemExistente) {
        return carrinhoAtual.map((item) => item.id === livro.id ? { ...item, quantidade: item.quantidade + 1} : item
      ); 
      }
    
    return [...carrinhoAtual, {...livro, quantidade: 1}];
    });
  }
  return (
    <>
      <Cabecalho />
      <Catalogo livros={livros} onAdicionar={adicionarAoCarrinho} />
      <Carrinho
        carrinho={carrinho}
        carrinhoAberto={carrinhoAberto}
        setCarrinhoAberto={setCarrinhoAberto}
        setCarrinho={setCarrinho}
      />
      <Rodape />
    </>
  );
}
