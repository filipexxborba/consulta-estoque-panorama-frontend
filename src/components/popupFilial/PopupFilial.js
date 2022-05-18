import React from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "./PopupFilial.css";

const PopupFilial = () => {
  const { listaFilial, setIsFilialSet } = React.useContext(GlobalContext);
  const select = React.useRef();

  const handleClick = (event) => {
    event.preventDefault();
    const temp = select.current.value;
    if (temp !== "0" && temp !== null && temp !== undefined) {
      localStorage.setItem("filial", select.current.value);
      setIsFilialSet(true);
      window.location.reload();
    }
  };

  return (
    <>
      <div className="popupFilial">
        <h2>Selecione a filial:</h2>
        <form>
          <select ref={select} name="filial">
            {listaFilial.map((item, index) => (
              <option key={index} value={index}>
                {item[0]}
              </option>
            ))}
          </select>
          <button onClick={handleClick}>Entrar</button>
        </form>
      </div>
    </>
  );
};

export default PopupFilial;
