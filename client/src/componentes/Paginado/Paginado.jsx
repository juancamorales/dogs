import React from "react";
import "./homePages.css"

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    //redondea para arriba todas las countries sobre la cantidad que quiero por pagina
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="u">
        {pageNumbers?.map((number) => (
          <li className="s" key={number}>
            <button className="l"
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  ); 
}