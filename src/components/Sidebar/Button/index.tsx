import React, { ReactNode } from 'react';
import './style.css';

type ButtonProps = {
    icon: string,
    typeButton: string,
    children: ReactNode,
}

function Button({ icon, typeButton, children }: ButtonProps) {
    const className = "sidebar__button " + typeButton;

    return (
        <div>
            <button className={className}>
                <img src={icon} />
                {children}
            </button>
        </div>
    );
}

export default Button;