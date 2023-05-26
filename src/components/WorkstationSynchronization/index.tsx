import { useState, useEffect } from 'react';

import './style.css';

import { Process } from "../../entities/process";
import JobHeader from "../JobForms/JobHeader";
import WorkstationSynchronizationHeader from './WorkstationSynchronizationHeader';
import EmployeeSynchronizationCard from './EmployeeSynchronizationCard';
import { Employee } from '../../entities/employee';
import { FetchAllEmployees } from '../../use_cases/employees/FetchAll';
import { EmployeeService } from '../../services/employee_service';
import { FetchAllBySector } from '../../use_cases/workstation/FetchAllBySector';
import { WorkstationService } from '../../services/workstation_service';
import { Workstation } from '../../entities/workstation';
import { Sector } from '../../entities/sector';
import { Update } from '../../use_cases/workstation/Update';

interface WorkstationSynchronizationProps {
    process: Process,
    setCurrentPage: (step: number) => void,
    jobScreenStep: number
}

interface LinkedEmployee {
    employee: Employee,
    workstation: Workstation | null
}

function WorkstationSynchronization({ process, setCurrentPage, jobScreenStep }: WorkstationSynchronizationProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [sector, setSector] = useState<Sector | undefined>();
    const [workstations, setWorkstations] = useState<Workstation[]>([]);
    const [linkedEmployees, setLinkedEmployees] = useState<LinkedEmployee[]>([]);

    async function fetchEmployees() {
        const fetchUC = new FetchAllEmployees(new EmployeeService());
        const employees = await fetchUC.execute();
        setEmployees(employees);
    }

    async function fetchWorkstations() {
        if (sector) {
            if (sector._id) {
                const fetchUC = new FetchAllBySector(new WorkstationService());
                const allWorkstations = await fetchUC.execute(sector._id);
                setWorkstations(allWorkstations);
            }
        }
    }

    function linkEmployeeToWorkstation() {
        const employeesToWorkstations: LinkedEmployee[] = [];

        for (let i = 0; i < employees.length; i++) {
            employeesToWorkstations.push({
                employee: employees[i],
                workstation: null
            });
        }

        if (workstations.length >= employees.length) {   
            for (let i = 0; i < employees.length; i++) {
                employeesToWorkstations[i].workstation = workstations[i];
            }
        } else {
            for (let i = 0; i < workstations.length; i++) {
                employeesToWorkstations[i].workstation = workstations[i];
            }
        }

        setLinkedEmployees(employeesToWorkstations);
    }

    // async function updateWorkstations() {
    //     const updateUC = new Update(new WorkstationService());
        
    //     linkedEmployees.forEach(linkedEmployee => {
    //         if (linkedEmployee.workstation) {
    //             await updateUC.execute(linkedEmployee.workstation._id, sector?._id, { employeeId: linkedEmployee.employee._id });
    //         }
    //     })
    // }

    function renderCards(linkedEmployee: LinkedEmployee, index: number) {
        return (
            <EmployeeSynchronizationCard key={`${index}-${linkedEmployee.employee._id}`} linkedEmployee={linkedEmployee}></EmployeeSynchronizationCard>
        );
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        fetchWorkstations();
    }, []);

    useEffect(() => {
        if (employees.length > 0 && workstations.length > 0) {
            linkEmployeeToWorkstation();
        }
    }, [employees, workstations]);

    return (
        <div className="workstation__synchronization__page__container">
            <JobHeader process={process} setCurrentPage={setCurrentPage} jobScreenStep={jobScreenStep}></JobHeader>
            <div className="workstation__synchronization__container">
                <WorkstationSynchronizationHeader></WorkstationSynchronizationHeader>

                <div className="employees__synchronization__wrapper">
                    {linkedEmployees.map(renderCards)}
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