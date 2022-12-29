import React from 'react'
import { ControlPresupuesto } from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'



const Header = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos}) => {




  return (
    <header>
        <h1>Planificador de gastos</h1>
      {isValidPresupuesto ? (
           <ControlPresupuesto
                presupuesto = {presupuesto}
                gastos = {gastos}
                setGastos = {setGastos}
                setPresupuesto = {setPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
           
           ></ControlPresupuesto>

      ) :  (

        <NuevoPresupuesto 
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto}
            isValidPresupuesto = {isValidPresupuesto}
            setIsValidPresupuesto = {setIsValidPresupuesto}
        ></NuevoPresupuesto>
      )}




        
    </header>
  )
}

export default Header