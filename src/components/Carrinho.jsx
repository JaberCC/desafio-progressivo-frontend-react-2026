import React from 'react';
import '../styles/cart.css'; 
import  formatarPreco from "../dados/formatarPreco.js";
import FinalizarCompra from '../components/FinalizarCompra.jsx'; 

export default function Carrinho({
  carrinhoAberto,
  setCarrinhoAberto,
  carrinho = [],
  setCarrinho,
}) {
  

  const removerItem = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
  };


  const total = carrinho.reduce((acumulador, item) => {
    return acumulador + (item.preco * item.quantidade);
  }, 0);

  return (
    <>
     
      <div 
        className={`cart-backdrop ${carrinhoAberto ? 'cart-backdrop--active' : ''}`}
        onClick={() => setCarrinhoAberto(false)}
      ></div>

      
      <aside className={`cart ${carrinhoAberto ? 'cart--active' : ''}`}>
        
      
        <div className="cart__header">
          <h2>Seu Carrinho</h2>
       
          <button 
            className="cart__close" 
            onClick={() => setCarrinhoAberto(false)}
          >
            &times;
          </button>
        </div>

        <div className="cart__products">
          {carrinho.length === 0 ? (
            <p className="cart__empty">Carrinho vazio</p>
          ) : (
            
            carrinho.map((item) => (
              <div className="cart__product" key={item.id}>
                <img src={item.capa} alt={item.titulo} className="cart__product-image" />
                <div className="cart__product-info">
                  <h4>{item.titulo}</h4>
                  <p>Qtd: {item.quantidade}</p>
                  <p className="cart__product-price">
                    {formatarPreco(item.preco * item.quantidade)}
                  </p>
                  
                
                  <button 
                    className="cart__product-remove" 
                    onClick={() => removerItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

       
        <div className="cart__footer">
          <div className="cart__total">
            <span>Total:</span>
            <strong>{formatarPreco(total)}</strong>
          </div>

          <FinalizarCompra 
            carrinho={carrinho} 
            total={total} 
            onSucesso={() => setCarrinho([])} 
          />
        
          <button className="cart__checkout">Finalizar Compra</button>
        </div>

      </aside>
    </>
  );
}