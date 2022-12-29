import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      

      {filtro ? (
        <>
          <h2>{gastosFiltrados.length ? `Gastos en ${filtro}` : "No hay gastos en esta categoria"}</h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              gasto={gasto}
              key={gasto.id}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            ></Gasto>
          ))}
        </>
      ) : (

        <>
        
        <h2>{gastos.length ? "Gastos" : "No hay gastos"}</h2>
        {gastos.map((gasto) => (
          <Gasto
            gasto={gasto}
            key={gasto.id}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          ></Gasto>
        ))}
        
        </>
       
      )}
    </div>
  );
};

export default ListadoGastos;
