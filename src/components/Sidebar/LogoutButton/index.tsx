import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

interface LogoutButtonProps {
    icon: string,
    path: string,
    children: ReactNode,
}

function LogoutButton({ icon, path, children }: LogoutButtonProps) {
    const handleLogout = () => {
        axios.post('http://localhost:3000/logout') 
        .then(response => {
            if (response.status === 200) {
                console.log('Logout successfully');
            }
            else if (response.status === 400) {
                console.log(response.data);
            }
        })
        .catch(error => {
            console.error('Logout failed', error);
        });
    }

    return (
        <NavLink to={path} className={({ isActive }) => isActive ? "Sidebar__button--active" : "Sidebar__button"} onClick={handleLogout}>
            <img src={icon} alt="Logout" />
            <span>{children}</span>
        </NavLink>
    );
}

export default LogoutButton;