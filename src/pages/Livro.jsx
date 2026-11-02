import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import formatarPreco from '../dados/formatarPreco.js';

export default function Livro({ livros = [], onAdicionar, carregando, erro }) {
  const { id } = useParams();

  
  if (carregando) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div role="alert" style={{ color: '#ff4d4d', marginBottom: '1rem' }}>
          {erro}
        </div>
        <Link to="/" className="button button--dark">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  
  const livro = livros.find((l) => String(l.id) === String(id));

  useEffect(() => {
    const tituloAnterior = document.title;
    
    if (livro) {
      document.title = `${livro.titulo} | Página 42`;
    } else {
      document.title = 'Livro não encontrado | Página 42';
    }

    return () => {
      document.title = tituloAnterior;
    };
  }, [livro]);

  if (!livro) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Livro não encontrado</h2>
        <p style={{ margin: '1rem 0' }}>O livro que você está procurando não existe ou foi removido.</p>
        <Link to="/" className="button button--dark">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <main className="container" style={{ padding: '3rem 0' }}>
      <div className="book-detail">
        <div className="book-detail__cover">
          <img src={livro.capa} alt={livro.titulo} />
        </div>
        
        <div className="book-detail__content">
          <h1>{livro.titulo}</h1>
          <p className="book-detail__author">Por <strong>{livro.autor}</strong></p>
          
          <p className="book-detail__price">
            {formatarPreco(livro.preco)}
          </p>
          
          <p className="book-detail__description">{livro.descricao}</p>
          
          <div className="book-detail__meta">
            <span><strong>Páginas:</strong> {livro.paginas}</span>
            <span><strong>Editora:</strong> {livro.editora}</span>
            <span><strong>Ano:</strong> {livro.ano}</span>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button 
              className="button button--dark"
              onClick={() => onAdicionar && onAdicionar(livro)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}