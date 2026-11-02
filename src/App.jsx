import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho.jsx";
import Rodape from "./components/Rodape.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Carrinho from "./components/Carrinho.jsx";
import { API_KEY, API_URL } from "./dados/api.js";
import { Routes, Route } from "react-router-dom";
import Livro from "./pages/Livro.jsx";

export default function App() {
  const [livros, setLivros] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");


  useEffect(() => {
    let ignorar = false;
    async function carregar() {
      setCarregando(true);
      setErro("");

      try {
        const resposta = await fetch(API_URL, {
          headers: { "x-api-key": API_KEY },
        });

        if (!resposta.ok) {
          throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const dados = await resposta.json();

        if (!ignorar) {
          const listaLivros = Array.isArray(dados) ? dados : (dados.livros || []);
          setLivros(listaLivros);
        }
      } catch (erro) {
        if (!ignorar) {
          console.error("Erro ao carregar livros:", erro);
          setErro(erro.menssage || "Não foi possível carregar os livros.");
        }
      } finally {
        if (!ignorar) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ignorar = true;
    };
  }, []);

  function adicionarAoCarrinho(livro) {
    setCarrinho((carrinhoAtual) => {
      const itemExistente = carrinhoAtual.find((item) => item.id === livro.id);

      if (itemExistente) {
        return carrinhoAtual.map((item) =>
          item.id === livro.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...carrinhoAtual, { ...livro, quantidade: 1 }];
    });
  }
  return (
    <>
      <Cabecalho onOpenCart={() => setCarrinhoAberto(true)} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Catalogo livros={livros} onAdicionar={adicionarAoCarrinho}
              carregando={carregando}
              erro={erro}
              />
            }
          />
          <Route
            path="/livros/:id"
            element={
              <Livro
                livros={livros} 
                onAdicionar={adicionarAoCarrinho}
                carregando={carregando}
                erro={erro} 
              />
            }
          />
          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </main>

      {/*<Catalogo livros={livros}onAdicionar={adicionarAoCarrinho}/>*/}

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
