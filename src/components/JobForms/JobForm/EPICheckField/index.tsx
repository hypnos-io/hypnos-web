import {useState} from 'react';

import './style.css';

interface EPICheckFieldProps {
    icon: string,
    children: React.ReactNode
}

function EPICheckField({ icon, children }: EPICheckFieldProps) {
    const [isChecked, setIsChecked] = useState(false);

    function checkField() {
        setIsChecked(!isChecked);
    }

    return (
        <div className={isChecked ? "job__epi__checkfield checked" : "job__epi__checkfield"} onClick={() => checkField()}>
            <img src={icon}/>
            <label>{children}</label>
        </div>
    );
}

export default EPICheckField;