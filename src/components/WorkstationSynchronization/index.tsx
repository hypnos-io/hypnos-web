import { useState, useEffect } from 'react';

import './style.css';

import { Process } from "../../entities/process";
import JobHeader from "../JobForms/JobHeader";
import WorkstationSynchronizationHeader from './WorkstationSynchronizationHeader';
import EmployeeSynchronizationCard from './EmployeeSynchronizationCard';
import { Employee } from '../../entities/employee';
import { FetchAllEmployees } from '../../use_cases/employees/FetchAll';
import { EmployeeService } from '../../services/employee_service';

interface WorkstationSynchronizationProps {
    process: Process,
    setCurrentPage: (step: number) => void,
    jobScreenStep: number
}

function WorkstationSynchronization({ process, setCurrentPage, jobScreenStep }: WorkstationSynchronizationProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);

    async function fetchEmployees() {
        const fetchUC = new FetchAllEmployees(new EmployeeService());
        const employees = await fetchUC.execute();
        setEmployees(employees);
    }

    function renderCards(employee: Employee, index: number) {
        return (
            <EmployeeSynchronizationCard key={`${index}-${employee._id}`} employee={employee}></EmployeeSynchronizationCard>
        );
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="workstation__synchronization__page__container">
            <JobHeader process={process} setCurrentPage={setCurrentPage} jobScreenStep={jobScreenStep}></JobHeader>
            <div className="workstation__synchronization__container">
                <WorkstationSynchronizationHeader></WorkstationSynchronizationHeader>

                <div className="employees__synchronization__wrapper">
                    {employees.map(renderCards)}
                </div>
                <div className="buttons__container">
                    <button className="cancel__button">Voltar</button>
                    <button className="continue__button">Prosseguir</button>
                </div>
            </div>
        </div>
    );
}

export default WorkstationSynchronization;