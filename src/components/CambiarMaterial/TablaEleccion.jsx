import React from 'react';
import './TablaEleccion.css';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

function TablaEleccion(props) {
  const { resource1 } = props;
  const { getToken } = useContext(AuthContext);

  const [listaRecursos, setListaRecursos] = useState([
    { id: 1, nombre: "wood", cantidad: null, imagen: "https://cdn-icons-png.flaticon.com/512/1254/1254533.png?w=740&t=st=1681842714~exp=1681843314~hmac=60e3db3a5ced15aa00465e14e4fc58572bee70e581f42c58c380060a5332bcbf" },
    { id: 2, nombre: "clay", cantidad: null, imagen: "https://cdn-icons-png.flaticon.com/512/332/332183.png?w=740&t=st=1681842837~exp=1681843437~hmac=a87a854e1c01692c583d7a66047245bc9a7de0050e7c62bb05c4293001be6fa8" },
    { id: 3, nombre: "wheat", cantidad: null, imagen: "https://cdn-icons-png.flaticon.com/512/244/244755.png?w=740&t=st=1681842970~exp=1681843570~hmac=4958b2f89480e8aa928f02df920c822cfe21abe83857a753fc0e7c8fcc0dfff1" }
  ]);

  const getTokenFromMail = async () => {
    const PORT = 3000;
    const response_game = await fetch(`https://backend-catan.onrender.com/game`);
    const data_game = await response_game.json();
    const game_id = data_game.id;
    const response_nombre = await fetch(`https://backend-catan.onrender.com/players/playername/${game_id}`);
    const json_response = await response_nombre.json();
    const mail = await json_response.mail;
    const token = await getToken(mail);
    return token;
  };

  const listaRecursosFiltrada = listaRecursos.filter(recurso => recurso.nombre !== resource1);

useEffect(() => {
  const obtenerListaRecursos = async () => {
    try {
      const PORT = 3000;

      const response_game = await fetch(`https://backend-catan.onrender.com/game`);
      const data_game = await response_game.json();
      const game_id = data_game.id;
      const token = await getTokenFromMail();


      const recursos = await fetch(`https://backend-catan.onrender.com/players/resources/${game_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data_recurso = await recursos.json();

      const actualizarRecursos = () => {
          setListaRecursos(prevRecursos => {
            return prevRecursos.map(recurso => {
              if (data_recurso.hasOwnProperty(recurso.nombre)) {
                return {
                  ...recurso,
                  cantidad: data_recurso[recurso.nombre]
                };
              }
              return recurso;
            });
          });
        };;
      actualizarRecursos();
    } catch (error) {
      console.log(error);
    }
  };
  obtenerListaRecursos();
}, []);

  const EnviarResources = async (resource2) => {

    const PORT = 3000;
    const response_game = await fetch(`https://backend-catan.onrender.com/game`);
    const data_game = await response_game.json();
    const game_id = data_game.id;

    const game_id_codificado = encodeURIComponent(game_id);
    const resource1_codificado = encodeURIComponent(resource1);
    const resource2_codificado = encodeURIComponent(resource2);

    let url = `https://backend-catan.onrender.com/players/change`;
    const token = await getTokenFromMail();

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify({ game_id: game_id_codificado, resource1: resource1_codificado, resource2: resource2_codificado }),
    })
    .then((response) => {
        window.location.href = "/partidarapida";
    })
    .catch((error) => {setDisplayValue("Error");});
}

  return (
    <table className='tabla-recursos'>
      <caption><h5>Elige qué recurso quieres!</h5></caption>
      <tbody>
        {listaRecursosFiltrada.map((recurso) => (
          <FilaTabla key={recurso.id} recurso={recurso} EnviarResources={EnviarResources} />
        ))}
      </tbody>
    </table>
  );
}

function FilaTabla(props) {
  const { nombre, cantidad, imagen } = props.recurso;

  const handleButtonClick = () => {
    props.EnviarResources(nombre);
  };

  return (
    <tr className='datos'>
      <td className='dato-image'>
        <img src={imagen} alt={nombre} />
      </td>
      <td className='dato-quantity'>{cantidad}</td>
      <td>
        <button onClick={handleButtonClick}>Quiero {nombre}!</button>
      </td>
    </tr>
  );
}

export default TablaEleccion;
