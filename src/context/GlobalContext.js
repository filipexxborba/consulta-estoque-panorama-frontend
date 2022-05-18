import React from "react";
export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const apiURL = `http://panoramavm.no-ip.info:9999`;
  const [currentMethod, setCurrentMethod] = React.useState(false);
  const [showingDadosEstoque, setShowingDadosEstoque] = React.useState(false);
  const [listaProduto, setListaProduto] = React.useState(null);
  const [isFilialSet, setIsFilialSet] = React.useState(false);

  const listaFilial = [
    ["Escolha uma filial"],
    ["P01 - República", "pdv.republica@panoramahomecenter.com.br"],
    ["P02 - JK", "pdv.jk@panoramahomecenter.com.br"],
    ["P03 - Cataratas", "pdv.cataratas@panoramahomecenter.com.br"],
    ["P04 - Morumbi", "pdv.morumbi@panoramahomecenter.com.br"],
    ["P05 - Vila A", "pdv.vilaa@panoramahomecenter.com.br"],
    ["P06 - Cap", "pdv.cap@panoramahomecenter.com.br"],
    ["P07 - STI", "pdv.sti@panoramahomecenter.com.br"],
    ["P08 - Porto Meira", "pdv.portomeira@panoramahomecenter.com.br"],
    ["P09 - Medianeira", "pdv.medianeira@panoramahomecenter.com.br"],
    ["P10 - Toledo", "pdv.toledo@panoramahomecenter.com.br"],
  ];

  React.useEffect(() => {
    let localLista = localStorage.getItem("listaProdutos");
    const temp = localStorage.getItem("filial");
    if (temp !== 0 && temp !== null && temp !== undefined) {
      setIsFilialSet(true);
    } else {
      setIsFilialSet(false);
    }
    if (localLista) {
      setListaProduto(JSON.parse(localStorage.getItem("listaProdutos")));
      console.log(listaProduto);
    } else {
      let data = [];
      localStorage.setItem("listaProdutos", JSON.stringify(data));
      setListaProduto(data);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        apiURL,
        currentMethod,
        setCurrentMethod,
        showingDadosEstoque,
        setShowingDadosEstoque,
        listaProduto,
        setListaProduto,
        listaFilial,
        isFilialSet,
        setIsFilialSet,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
