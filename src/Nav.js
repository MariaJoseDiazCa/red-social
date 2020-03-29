import React from 'react'
import { NavLink } from 'react-router-dom'

import './Nav.css'

export default props =>

<nav className="Menu">
    <ul className="Menu__options">
        <li className="Menu__option">
            {/* se le añade el atributo "exact" para que no la marque como activa al cambiar a otra opcion del
            menu de navegacion */}
            <NavLink exact activeClassName="menu__link--active" className="Menu__link" to='/'>Authors</NavLink>
        </li>
        <li className="Menu__option">
            <NavLink activeClassName="menu__link--active" className="Menu__link" to='/profile'>Profile</NavLink>
        </li>
        <li className="Menu__option">
            <NavLink activeClassName="menu__link--active" className="Menu__link" to='/subscribers'>Subscribers</NavLink>
        </li>
    </ul>
</nav>