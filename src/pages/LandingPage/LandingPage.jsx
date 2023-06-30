import React, { useState, useEffect, useContext } from 'react'
import './LandingPage.css'
import Navbar from '../../components/Navbar/Navbar'
import LoginForm from '../../components/LoginForm/LoginForm'
import { AuthContext } from '../../auth/AuthContext'
import axios from 'axios'

function LandingPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { tokens } = useContext(AuthContext);
  const [Name1, setName1] = useState('')
  const [Name2, setName2] = useState('')
  const [Name3, setName3] = useState('')
  const [firstMail, setFirstMail] = useState('');
  const [secondMail, setSecondMail] = useState('');
  const [thirdMail, setThirdMail] = useState('');

  useEffect(() => {
    // Obtener los primeros 3 mails del local storage
    const mails = Object.keys(tokens).slice(0, 3);
    if (mails.length >= 1) {
      setFirstMail(mails[0]);
    }
    if (mails.length >= 2) {
      setSecondMail(mails[1]);
    }
    if (mails.length >= 3) {
      setThirdMail(mails[2]);
    }
  }, [tokens]);

  const handleNameChange1 = (event) => {
    setName1(event.target.value);
  }

  const handleNameChange2 = (event) => {
    setName2(event.target.value);
  }

  const handleNameChange3 = (event) => {
    setName3(event.target.value);
  }

  const handleLoginClick = () => {
    setShowLoginForm(true);
  }

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
  }

  const handleStartGame = () => {
    if (Name1 === '' || Name2 === '' || Name3 === '') {
      alert('Please enter all names');
    } else if (Object.keys(tokens).length < 3) {
      alert('Please login all players');
    } else {
      const dataUsers = {
        "user1": {
          "name": Name1,
          "mail": firstMail
        },
        "user2": {
          "name": Name2,
          "mail": secondMail
        },
        "user3": {
          "name": Name3,
          "mail": thirdMail
        }
      }
      const PORT = 3000;
      fetch(`https://backend-catan.onrender.com/game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens[firstMail]}`
        },
        body: JSON.stringify(dataUsers)
      })
      .then(response => response.json())
      .then((data) => {
        window.location.href = `/partidarapida`;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  return (
    <>
    <div id="landing-page">
      <Navbar />
      <div className="contenedor head">
          <h1 className="titulo">Catan 2.0</h1>
          <p className="copy">¡Juega con tus amigos y se el mejor colonizador de tierras!</p>
          <table className='landing-table'>
          <thead>
            <tr>
              <th>Player</th>
              <th>Name</th>
              <th>Mail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Player 1</td>
              <td>
                <input
                  type="text"
                  value={Name1}
                  onChange={handleNameChange1}
                  placeholder="Enter name"
                />
              </td>
              <td>
                {firstMail ? firstMail : <button className='login-button' onClick={handleLoginClick}>Login</button>}
              </td>
            </tr>
            <tr>
              <td>Player 2</td>
              <td>
                <input
                  type="text"
                  value={Name2}
                  onChange={handleNameChange2}
                  placeholder="Enter name"
                />
              </td>
              <td>
                {secondMail ? secondMail : <button className='login-button' onClick={handleLoginClick}>Login</button>}
              </td>
            </tr>
            <tr>
              <td>Player 3</td>
              <td>
                <input
                  type="text"
                  value={Name3}
                  onChange={handleNameChange3}
                  placeholder="Enter name"
                />
              </td>
              <td>
                {thirdMail ? thirdMail : <button className='login-button' onClick={handleLoginClick}>Login</button>}
              </td>
            </tr>
          </tbody>
        </table>
          {showLoginForm && <LoginForm onClose={handleLoginFormClose} />}
          <div className="iniciar-partida">
            <button onClick={handleStartGame}>Iniciar Partida</button>
          </div>
      </div>

    </div>
    </>
  )
}

export default LandingPage;
