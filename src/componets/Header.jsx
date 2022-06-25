/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { MyContext } from "../Context";

class Header extends React.Component {
    static contextType = MyContext

    render() {
    const {setMusic, setRequest} =this.context;
    return (
        <header class="header">
            <a  href="index.html">
                <img className="header__logo" src="images/icon-menu.png" alt="Logo" width="47px" height="47px"></img>
            </a>
            <nav class="header_navigation">
                <a className="item" onClick={() => { setMusic(true); setRequest("");}}>Главная</a>
                <a className="item" onClick={() => { setMusic(true); setRequest("");}}>Коллекция</a>
                <a className="item" onClick={() => { setMusic(false); setRequest("");}}>Авторы</a>
            </nav>
            <div class="header__search">
                <input className="search-bar" type="text"  placeholder="Исполнитель, трек, альбом" onKeyPress={(e) => e.key === 'Enter' ? setRequest(e.target.value) : false}/>
            </div>
        </header>)
    }
}

export default Header;