import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

interface NavButtonProps {
    icon: string,
    path: string,
    children: ReactNode,
}

function NavButton({ icon, path, children }: NavButtonProps) {
    return (
        <NavLink to={path} className={({ isActive }) => isActive ? "Sidebar__button--active" : "Sidebar__button"}>
            <img src={icon} />
            <span>{children}</span>
        </NavLink>
    );
}

export default NavButton;