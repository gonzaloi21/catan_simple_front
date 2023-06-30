import { useState } from 'react';
import Tablero_completo from '../../components/Tablero/Tablero_completo/Tablero_completo';
import './PartidaRapida.css'

function PartidaRapida() {
    const handleTerminarPartida = async () => {
      localStorage.setItem('dadoLanzado', 'false');
      window.location.href = '/';
    }

    return (
      <>
      <div className="partida-rapida">

      <h5 className='partida-rapida-titulo'>¡Que gane el mejor!</h5>
        <Tablero_completo />
      </div>
      <button className="boton-terminar-partida" onClick={handleTerminarPartida}>Terminar Partida</button>
      </>
    )

}

export default PartidaRapida