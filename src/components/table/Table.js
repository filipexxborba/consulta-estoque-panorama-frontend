import React from "react";
import "./Table.css";

const Table = ({ data }) => {
    console.log(data);
  return (
    <>
      <h2>Dados do Estoque:</h2>
      <table className="tableEstoque">
        <thead>
          <tr>
            <th>Filial</th>
            <th>Estoque Disponível</th>
            <th>Compras Pendentes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>P01</td>
            <td>{data.P01[0]}</td>
            <td>{data.P01[1]}</td>
          </tr>
          <tr>
            <td>P02</td>
            <td>{data.P02[0]}</td>
            <td>{data.P02[1]}</td>
          </tr>
          <tr>
            <td>P03</td>
            <td>{data.P03[0]}</td>
            <td>{data.P03[1]}</td>
          </tr>
          <tr>
            <td>P04</td>
            <td>{data.P04[0]}</td>
            <td>{data.P04[1]}</td>
          </tr>
          <tr>
            <td>P05</td>
            <td>{data.P05[0]}</td>
            <td>{data.P05[1]}</td>
          </tr>
          <tr>
            <td>CD</td>
            <td>{data.P06[0]}</td>
            <td>{data.P06[1]}</td>
          </tr>
          <tr>
            <td>P07</td>
            <td>{data.P07[0]}</td>
            <td>{data.P07[1]}</td>
          </tr>
          <tr>
            <td>P08</td>
            <td>{data.P08[0]}</td>
            <td>{data.P08[1]}</td>
          </tr>
          <tr>
            <td>P09</td>
            <td>{data.P09[0]}</td>
            <td>{data.P09[1]}</td>
          </tr>
          <tr>
            <td>P10</td>
            <td>{data.P10[0]}</td>
            <td>{data.P10[1]}</td>
          </tr>
          <tr>
            <td>P11</td>
            <td>{data.P11[0]}</td>
            <td>{data.P11[1]}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
