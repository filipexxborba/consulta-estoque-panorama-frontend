import React from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Table from "../table/Table";
import "./DadosProduto.css";
import buttonImage from "../../assets/button.png";

const DadosProduto = ({
  nome,
  codigoProduto,
  marca,
  unidade,
  tipoVendas,
  preco,
  vendaDireta,
  listaEstoque,
  listaData,
}) => {
  const {
    showingDadosEstoque,
    setShowingDadosEstoque,
    listaProduto,
    setListaProduto,
  } = React.useContext(GlobalContext);
  // const [currentEstoque, setCurrentEstoque] = React.useState("");

  function handleClick() {
    setShowingDadosEstoque(!showingDadosEstoque);
  }

  function handleAddLista(event) {
    event.preventDefault();
    let currentData = listaProduto;
    let valor = Number(preco).toFixed(2);
    valor = String(valor).replace(".", ",");
    let newProduto = {
      codigo: codigoProduto,
      descricao: nome,
      valor: valor,
    };
    currentData.push(newProduto);
    localStorage.setItem("listaProdutos", JSON.stringify(currentData));
    setListaProduto(currentData);
    // console.log(listaProduto);
    window.location.reload();
  }

  return (
    <>
      <h2>Dados do produto:</h2>
      <div className="container dados">
        <ul>
          <div className="row">
            <li>
              <h5>Nome:</h5>
              <p>{nome}</p>
            </li>
          </div>
          <div className="row">
            <li>
              <h5>Marca:</h5>
              <p>{marca}</p>
            </li>
            <li>
              <h5>Unidade de Venda:</h5>
              <p>{unidade}</p>
            </li>
          </div>
          <div className="row">
            <li>
              <h5>Tipo de Venda:</h5>
              <p>{tipoVendas === "S" ? "PRONTA ENTREGA" : "SOB ENCOMENDA"}</p>
            </li>
            <li>
              <h5>Venda direta:</h5>
              <p>{vendaDireta === "S" ? "SIM" : "NÃO"}</p>
            </li>
          </div>
          <div className="row">
            <li>
              <h5>Preço:</h5>
              <p>R$ {Number(preco).toFixed(2).toLocaleString("pt-br")}</p>
            </li>
            <li>
              <h5>Estoque Total:</h5>
              <p>
                {listaEstoque.TOTAL} {unidade.toLowerCase()}
              </p>
            </li>
          </div>
          <div className="row">
            <li>
              <h5>DT. Últ. Compra:</h5>
              <p>{listaData[0]}</p>
            </li>
            <li>
              <h5>Quantidade:</h5>
              <p>
                {listaData[1] !== "N/A" ? (
                  <>
                    {listaData[1]}
                    {unidade.toLowerCase()}
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </li>
          </div>
          <div className="row last">
            <img src={buttonImage} onClick={handleAddLista} />
          </div>
        </ul>
      </div>
      {showingDadosEstoque ? <Table data={listaEstoque} /> : null}
      <button onClick={handleClick}>
        {showingDadosEstoque
          ? "ESCONDER AS INFORMAÇÕES DE ESTOQUE"
          : "MOSTRAR ESTOQUE DE TODAS FILIAIS"}
      </button>
    </>
  );
};

export default DadosProduto;
