import { useState } from "react";

export default function FinalizarCompra({carrinho, total, onSucesso}) {
 
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [erro, setErro] = useState('');
  const [confirmacao, setConfirmacao] = useState(null);
 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || !cidade.trim()){
      setErro ('Por favor, preencha os campos de nome e Cidade corretamente.')
      return;
    }

      else if (!carrinho || carrinho.length === 0){
        setErro ('Verifique se os itens estão no carrinho!');
        return;
      }
        
    

    setErro('');
    setConfirmacao({nome: nome.trim(), cidade: cidade.trim(), total});
    setNome('');
    setCidade('');

    if (onSucesso) {
      onSucesso();
    }
  };
  return (
    <div className = "finalizar-compra-container">
      <h2>Finalizar Compra</h2>

      {erro && (
         <div role = "alert" className = "error-message" style = {{color:'red', marginBottom: '10px'}}>
          {erro}
         </div>
  )}

      {confirmacao ? (
        <div className = "sucess-message">
          <p><strong>Compra simulada com sucesso!</strong></p>
          <p>Cliente: {confirmacao.nome} ({confirmacao.cidade})</p>
          <p>Total: R$ {Number(confirmacao.total/100).toFixed(2)}</p>
        </div>
  ) : (
      <form onSubmit={handleSubmit}>
        <div className = "form-group">
          <label htmlFor = "nome">Nome:</label>
          <input
            type = "text"
            id = "nome"
            value = {nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cidade">Cidade:</label>
          <input 
            type="text"
            id="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required 
          />
        </div>

        <button type="submit">Enviar Pedido</button>
      </form>
    )}
      
    </div>
  );
}
