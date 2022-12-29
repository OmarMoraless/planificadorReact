import { useState, useEffect } from "react";
import Filtros from "./components/Filtros";

import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";


import { generarId } from "./helpers";

import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto" ?? 0))
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    

    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []

  ); 
  const [gastoEditar, setGastoEditar] = useState({});
    const [filtro, setFiltro] = useState('');
const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

 

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Si hay un gasto, vamos a actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };


  useEffect(() => {  ///filtrando gastos por categoria
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
}, [filtro, gastoEditar, guardarGasto]);


  return (
    <div className={modal ? "fijar" : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      ></Header>



      {isValidPresupuesto && (
        <>
          <main>
           <Filtros 
                filtro = {filtro}
                setFiltro = {setFiltro}
           ></Filtros>
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados = {gastosFiltrados}
              filtro = {filtro}
            ></ListadoGastos>
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="IconoNuevoGasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        ></Modal>
      )}
    </div>
  );
}

export default App;
