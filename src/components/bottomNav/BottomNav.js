import React from "react";
import { GlobalContext } from "../../context/GlobalContext";
import './BottomNav.css';

const BottomNav = () => {
  const { currentMethod, setCurrentMethod } = React.useContext(GlobalContext);

  function handleClick() {
    setCurrentMethod(!currentMethod);
  }

  return (
    <>
      <nav className="bottom__nav">
        <h3 onClick={handleClick} className={currentMethod ? "bottom__nav__button-active" : "bottom__nav__button"}>Código de Barras</h3>
        <h3 onClick={handleClick} className={!currentMethod ? "bottom__nav__button-active" : "bottom__nav__button"}>Código do Produto</h3>
      </nav>
    </>
  );
};

export default BottomNav;