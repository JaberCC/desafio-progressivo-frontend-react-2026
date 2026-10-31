import React from "react";
import formatarPreco from "../dados/formatarPreco";
import "../styles/home.css";
import { Link } from "react-router-dom";

export default function LivroCard({livro, onAdicionar}) {
  // A Pessoa 1 completa este componente na semana 1.
  return (
    <article className="book-card">
      <Link to={`/Livros/${livro.id}`} className="book-card__link">
        <div className={`book-cover book-cover--${livro.cor}`}>
          <h3>{livro.titulo}</h3>
          <small>{livro.autor}</small>
          <b>p.42</b>
        </div>
        <div className="book-card__details">
          <p>{livro.categoria}</p>
          <h3>{livro.titulo}</h3>
          <span>{livro.autor}</span>
        </div>
            
      </Link>
      <div className="book-card__action">
        <strong>{formatarPreco(livro.preco)}</strong>
        <button
          type="button"
          className="button"
          onClick={() => onAdicionar(livro)}>
            Adicionar ao Carrinho
        </button>
      </div>
    </article>
  );
}
