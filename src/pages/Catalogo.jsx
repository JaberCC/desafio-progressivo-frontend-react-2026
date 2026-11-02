import React from 'react';
import LivroCard from '../components/LivroCard.jsx';

export default function Catalogo({ livros, onAdicionar, carregando, erro }) {
  return (
    <main id="inicio">
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <p className="eyebrow">livros para todos os momentos</p>
            <h1>
              Encontre uma
              <br />
              nova <em>historia.</em>
            </h1>
            <p>
              Uma seleção de livros para ler, presentear e guardar na estante.
            </p>
            <a href="#catalogo" className="button button--dark">
              Ver livros
            </a>
          </div>
          <div className="hero__books" aria-hidden="true">
            <div className="cover cover--yellow">
              <span>O pequeno</span>
              <strong>UNIVERSO</strong>
            </div>
            <div className="cover cover--coral">
              <span>A cidade</span>
              <strong>DE PAPEL</strong>
            </div>
            <div className="cover cover--blue">
              <span>Depois</span>
              <strong>DA CHUVA</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog container" id="catalogo">
        <div className="section-heading">
          <div>
            <p className="eyebrow">catalogo</p>
            <h2>Escolha sua próxima leitura</h2>
          </div>
        </div>
        
       
        {carregando && <p style={{ textAlign: 'center', padding: '2rem 0' }}>Carregando...</p>}

        {erro && (
          <div role="alert" style={{ textAlign: 'center', padding: '2rem 0', color: '#ff4d4d' }}>
            {erro}
          </div>
        )}

        {!carregando && !erro && livros.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem 0' }}>Nenhum livro encontrado</p>
        )}

        
        {!carregando && !erro && livros.length > 0 && (
          <div className="products__list">
            {livros.map((livro) => (
              <React.Fragment key={livro.id}>
                <LivroCard livro={livro} onAdicionar={onAdicionar} />
              </React.Fragment>
            ))}
          </div>
        )}
      </section>

      <section className="about" id="sobre">
        <div className="container">
          <p className="eyebrow">pagina 42</p>
          <h2>
            Uma livraria simples,
            <br />
            feita para boas leituras.
          </h2>
        </div>
      </section>
    </main>
  );
}