import React from "react";
import { GlobalContext } from "../context/GlobalContext";
import "./Main.css";
import "./ListaProdutos.css";
import DadosProduto from "../components/dadosProduto/DadosProduto";
import deleteButton from "../assets/deleteButton.png";
import PopupFilial from "../components/popupFilial/PopupFilial";

const Main = () => {
  const {
    currentMethod,
    apiURL,
    setShowingDadosEstoque,
    listaProduto,
    isFilialSet,
  } = React.useContext(GlobalContext);
  const [codigo, setCodigo] = React.useState("");
  const [showingInfoProduct, setShowingInfoProduct] = React.useState(false);
  const [produto, setProduto] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState(false);
  const [listaEstoque, setListaEstoque] = React.useState(false);
  const [listaData, setListaData] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [indexCurrent, setIndexCurrent] = React.useState(null);

  //   Se estiver selecionado o código de produto, chamar a API de código.
  if (currentMethod === false) {
    if (codigo.length === 6) {
      setShowingDadosEstoque(false);
      callProdutoAPI();
      setCodigo("");
    }
  }

  // Se estiver selecionado o código de barras, chamar a API de código de barras
  if (currentMethod === true) {
    if (codigo.length === 13) {
      setShowingDadosEstoque(false);
      callBarraAPI();
      setCodigo("");
    }
  }

  async function callCompraAPI(codigo) {
    let api = `${apiURL}/api/compras/${codigo}`;
    const response = await fetch(api, {
      method: "POST",
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (
      jsonResponse.length === 0 ||
      jsonResponse[0][0] === null ||
      jsonResponse[0][0] === undefined ||
      jsonResponse[0][0] === "0" ||
      jsonResponse[0][0] === 0
    ) {
      setListaData(["N/A", "N/A"]);
    } else {
      let data = new Date(jsonResponse[0][0]);
      data = data.toLocaleDateString("pt-br");
      setListaData([data, jsonResponse[0][1]]);
    }
    console.log(listaData);
  }

  async function callEstoqueApi(codigo) {
    let api = `${apiURL}/api/estoque/${codigo}`;
    const response = await fetch(api, {
      method: "POST",
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    let current = 0;
    jsonResponse.map((item) => {
      current += item[1];
    });
    const data = {
      P01: [jsonResponse[0][0], jsonResponse[0][1]],
      P02: [jsonResponse[1][0], jsonResponse[1][1]],
      P03: [jsonResponse[2][0], jsonResponse[2][1]],
      P04: [jsonResponse[3][0], jsonResponse[3][1]],
      P05: [jsonResponse[4][0], jsonResponse[4][1]],
      P06: [jsonResponse[5][0], jsonResponse[5][1]],
      P07: [jsonResponse[6][0], jsonResponse[6][1]],
      P08: [jsonResponse[7][0], jsonResponse[7][1]],
      P09: [jsonResponse[8][0], jsonResponse[8][1]],
      P10: [jsonResponse[9][0], jsonResponse[9][1]],
      P11: [jsonResponse[10][0], jsonResponse[10][1]],
      TOTAL: [current],
    };
    setListaEstoque(data);
  }

  async function callProdutoAPI() {
    setLoading(true);
    let url = `${apiURL}/api/produto/${codigo}&11`;
    const response = await fetch(url, {
      method: "POST",
    });
    const jsonResponse = await response.json();
    if (jsonResponse[0] === undefined) {
      setLoading(false);
      setShowingInfoProduct(false);
      setErro(true);
    } else {
      setErro(false);
      console.log(jsonResponse);
      const data = {
        nome: jsonResponse[0][0],
        codigoProduto: jsonResponse[0][1],
        marca: jsonResponse[0][2],
        unidade: jsonResponse[0][3],
        tipoVendas: jsonResponse[0][4],
        preco: jsonResponse[0][6],
        vendaDireta: jsonResponse[0][5],
      };
      setProduto(data);
      callEstoqueApi(data.codigoProduto);
      callCompraAPI(data.codigoProduto);
      setShowingInfoProduct(true);
      setLoading(false);
    }
  }

  async function callBarraAPI() {
    setLoading(true);
    let url = `${apiURL}/api/codbarra/${codigo}&11`;
    const response = await fetch(url, {
      method: "POST",
    });

    const jsonResponse = await response.json();

    if (jsonResponse[0] === undefined) {
      setLoading(false);
      setShowingInfoProduct(false);
      setErro(true);
    } else {
      setErro(false);
      const data = {
        nome: jsonResponse[0][0],
        codigoProduto: jsonResponse[0][1],
        marca: jsonResponse[0][2],
        unidade: jsonResponse[0][3],
        tipoVendas: jsonResponse[0][4],
        preco: jsonResponse[0][6],
        vendaDireta: jsonResponse[0][5],
      };
      setProduto(data);
      callEstoqueApi(data.codigoProduto);
      callCompraAPI(data.codigoProduto);
      console.log(produto);
      setShowingInfoProduct(true);
      setLoading(false);
    }
  }

  function setDelete(index) {
    setIsDeleting(true);
    setIndexCurrent(index);
  }

  function procedDelete() {
    deleteCurrent(indexCurrent);
  }

  function cancelDelete() {
    setIsDeleting(false);
  }

  function deleteCurrent(index) {
    let currentData = listaProduto;
    currentData.splice(index, 1);
    localStorage.setItem("listaProdutos", JSON.stringify(currentData));
    window.location.reload();
  }

  return (
    <>
      {isFilialSet ? (
        <div className="container">
          <div className="teste"></div>
          <input
            type="number"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            placeholder={
              currentMethod
                ? "Insira o código de barras"
                : "Insira o código do produto"
            }
          ></input>
          {isDeleting ? (
            <div className="deletePopUp">
              <h1>Atenção</h1>
              <p>
                Você quer mesmo deletar esse item? Depois de deletado não tem
                como recuperar.
              </p>
              <div>
                <button onClick={() => cancelDelete()}>Não</button>
                <button onClick={() => procedDelete()}>Sim</button>
              </div>
            </div>
          ) : (
            <>
              {loading ? <div className="loadingState"></div> : null}
              {erro
                ? `Nenhum produto encontrado com esse código, verifique e tente novamente.`
                : null}
              {listaData ? (
                <div>
                  {showingInfoProduct ? (
                    <DadosProduto
                      nome={produto.nome}
                      codigoProduto={produto.codigoProduto}
                      marca={produto.marca}
                      unidade={produto.unidade}
                      tipoVendas={produto.tipoVendas}
                      preco={produto.preco}
                      vendaDireta={produto.vendaDireta}
                      listaEstoque={listaEstoque}
                      listaData={listaData}
                    />
                  ) : null}
                </div>
              ) : null}
              <div className="prod">
                <h2>Lista de Produtos:</h2>
                {listaProduto && listaProduto.length !== 0 ? (
                  <ul className="listaProdutos">
                    <li className="listaProdutos__header">
                      <p className="listaProdutos__codigo">Código</p>
                      <p className="listaProdutos__descricao">Descrição</p>
                      <p className="listaProdutos__valor">Valor</p>
                    </li>
                    {listaProduto && listaProduto.length !== 0 ? (
                      <>
                        {listaProduto.map((item, index) => (
                          <li key={index} className="listaProdutos__item">
                            <p className="listaProdutos__codigo">
                              {item.codigo}
                            </p>
                            <p className="listaProdutos__descricao">
                              {item.descricao}
                            </p>
                            <p className="listaProdutos__valor">
                              R$ {item.valor}
                            </p>
                            <img
                              src={deleteButton}
                              onClick={() => setDelete(index)}
                            />
                          </li>
                        ))}
                      </>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            </>
          )}
        </div>
      ) : (
        <PopupFilial />
      )}
    </>
  );
};

export default Main;
