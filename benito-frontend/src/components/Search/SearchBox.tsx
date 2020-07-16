import React from "react";
import { hot } from "react-hot-loader";

const SearchBox = (_: any) => (
  <div className='qui-search-box'>
    <div className='qui-search-filter'>
      <div className='qui-font-text'>Nombre</div>
      <input className="qui-search-input"></input>
    </div>
    <div className='qui-search-filter'>
      <div className='qui-font-text'>Categoria</div>
      <input className="qui-search-input"></input>
    </div>
    <div className='qui-search-filter'>
      <div className='qui-font-text'>Fechas</div>
        <input className="qui-search-input-date"></input>
        <input className="qui-search-input-date"></input>
    </div>
    <div className='qui-search-filter'>
      <div className='qui-font-text'>Palabra clave</div>
      <input className="qui-search-input"></input>
    </div>
    <div className='qui-search-filter'>
      <div className='qui-font-text'>Documentación</div>
      <input className="qui-search-input"></input>
    </div>
    <button className='btn-primary qui-search-btn'>Buscar</button>
  </div>
);

export default hot(module)(SearchBox);
