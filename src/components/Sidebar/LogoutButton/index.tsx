import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from '../../../use_cases/authentication/logout';
import { LogoutService } from '../../../services/logout_service';

interface LogoutButtonProps {
    icon: string,
    path: string,
    children: ReactNode,
}

function LogoutButton({ icon, path, children }: LogoutButtonProps) {
    const LOGIN_URL = '/';

    async function handleLogout() {
        const logoutUC = new Logout(new LogoutService());
        const response = await logoutUC.execute();

        if (response.status === 200) {
            window.location.href = LOGIN_URL;
        }
    }

    return (
        <NavLink to={path} className={({ isActive }) => isActive ? "Sidebar__button--active" : "Sidebar__button"} onClick={handleLogout}>
            <img src={icon} alt="Logout" />
            <span>{children}</span>
        </NavLink>
    );
}

export default LogoutButton;