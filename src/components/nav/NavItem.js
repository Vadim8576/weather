import React from 'react';
import { NavLink } from 'react-router-dom';


const NavItem = ({link, item}) => {
    // console.log(css.active);
    return (  
        
        <>
            <NavLink to={link} className='nav-link' activeClassName='active'>{item}</NavLink>
        </> 
    );
}

export default NavItem;