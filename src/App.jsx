import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho.jsx";
import Rodape from "./components/Rodape.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Carrinho from "./components/Carrinho.jsx";
import { API_KEY, API_URL } from "./dados/api.js";
import Carrinho from "./components/Carrinho.jsx";

export default function App() {
  const [livros, setLivros] = useState([]);
<<<<<<< HEAD
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
=======
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
>>>>>>> 6d02b650cfe790933486512c497d3bd806f3dfbe

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
<<<<<<< HEAD
      <Cabecalho />
      <Catalogo livros={livros} onAdicionar={adicionarAoCarrinho} />
      <Carrinho
        carrinho={carrinho}
        carrinhoAberto={carrinhoAberto}
        setCarrinhoAberto={setCarrinhoAberto}
        setCarrinho={setCarrinho}
      />
=======
      <Cabecalho onOpenCart={() => setCarrinhoAberto(true)} />
      
      <Catalogo livros={livros} />
      
      <Carrinho 
        carrinhoAberto={carrinhoAberto}
        setCarrinhoAberto={setCarrinhoAberto}
        carrinho={carrinho}
        setCarrinho={setCarrinho}
      />

>>>>>>> 6d02b650cfe790933486512c497d3bd806f3dfbe
      <Rodape />
    </>
  );
}