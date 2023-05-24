import React, {useState} from 'react';

import './style.css';

interface EPICheckFieldProps {
    icon: string,
    handleEpisChange: (epis: string) => void,
    children: React.ReactNode
}

function EPICheckField({ icon, handleEpisChange, children }: EPICheckFieldProps) {
    const [isChecked, setIsChecked] = useState(false);

    function checkField() {
        setIsChecked(!isChecked);
        const episString = React.Children.toArray(children).join('');
        handleEpisChange(episString);
    }

    return (
        <div className={isChecked ? "job__epi__checkfield checked" : "job__epi__checkfield"} onClick={() => checkField()}>
            <img src={icon}/>
            <label>{children}</label>
        </div>
    );
}

export default EPICheckField;