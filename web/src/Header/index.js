import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaPowerOff, FaPlus, FaCog } from 'react-icons/fa';
import './style.css';
import logo from '../assests/logoBlack.png';

export default function Header() {

  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/') ;
  }

  return(
  <header className='new'>
    <div className="img">
    <Link to="/profile">
      <img src={logo} alt="Logo"/>
      </Link>
    </div>
    <div className="menu">
      <ul className='new'>
        <li><Link to="/tasks/new"><FaPlus className='icon-header' size={16} /> NOVA TAREFA</Link></li>
        <li><Link to="/profile/edit"><FaCog className='icon-header' size={16} /> CONFIGURAÇÕES</Link></li>
        <li><Link onClick={handleLogout}><FaPowerOff className='icon-header' size={16} /> SAIR</Link></li>
      </ul>
    </div>
  </header>
  
  );

}