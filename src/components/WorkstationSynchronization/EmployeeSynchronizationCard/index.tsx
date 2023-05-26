import './styles.css'

import arrowsIcon from '../../assets/img/WorkstationSynchronization/Icon material-compare-arrows@2x.png';
import { Employee } from '../../../entities/employee';
import { Workstation } from '../../../entities/workstation';

interface LinkedEmployee {
    employee: Employee,
    workstation: Workstation | null
}

interface EmployeeSynchronizationCardProps {
    linkedEmployee: LinkedEmployee 
}

function EmployeeSynchronizationCard({ linkedEmployee }: EmployeeSynchronizationCardProps ) {
    return (
        <div className="employee__synchro__card">
            <div className="employee__synchro__card__content">
                <div className="status"></div>
                <img
                    src="https://images.unsplash.com/photo-1592948078640-39656341be54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    alt="profile"
                    className="profile"
                />
                <div className="description">
                    <label className="employee-name">{linkedEmployee.employee.name}</label>
                    <label className="employee-registration">{linkedEmployee.employee.registration}</label>
                    <label className="workstation-value"><strong>{linkedEmployee.workstation ? linkedEmployee.workstation.value : '-'}</strong></label>
                </div>
            </div>

            <img className="arrows" src={arrowsIcon} />
        </div>
    )
}

export default EmployeeSynchronizationCard;