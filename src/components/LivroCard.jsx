import React from "react";
import formatarPreco from "../dados/formatarPreco";
import "../styles/home.css";

export default function LivroCard({livro, onAdicionar}) {
  // A Pessoa 1 completa este componente na semana 1.
  return (
    <article className="book-card">
      <div className={`book-cover book-cover--${livro.cor}`}>
        <h3>{livro.titulo}</h3>
        <small>{livro.autor}</small>
        <b>p.42</b>
      </div>
      <div className="book-card__details">
        <p>{livro.categoria}</p>
        <h3>{livro.titulo}</h3>
        <span>{livro.autor}</span>
        <div>
          <strong>{formatarPreco(livro.preco)}</strong>
          <button>
            className="button"
            onClick={() => onAdicionar(livro)}
          </button>
        </div>
      </div>
    </article>
  );
}
