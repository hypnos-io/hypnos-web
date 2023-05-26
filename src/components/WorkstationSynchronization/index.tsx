import {useContext, useEffect, useState} from 'react'

import './style.css'

import {useNavigate} from 'react-router-dom'
import {JobContext} from '../../contexts/JobFlow'
import {Employee} from '../../entities/employee'
import {Process} from '../../entities/process'
import {Sector} from '../../entities/sector'
import {Workstation} from '../../entities/workstation'
import {JobService} from '../../services/job_service'
import {WorkstationService} from '../../services/workstation_service'
import {Create} from '../../use_cases/job/Create'
import {FetchAllBySector} from '../../use_cases/workstation/FetchAllBySector'
import {Update} from '../../use_cases/workstation/Update'
import JobHeader from '../JobForms/JobHeader'
import EmployeeSynchronizationCard from './EmployeeSynchronizationCard'
import WorkstationSynchronizationHeader from './WorkstationSynchronizationHeader'

interface WorkstationSynchronizationProps {
  process: Process
  setCurrentPage: (step: number) => void
  jobScreenStep: number
}

interface LinkedEmployee {
  employee: Employee
  workstation: Workstation | null
}

function WorkstationSynchronization({
  process,
  setCurrentPage,
  jobScreenStep,
}: WorkstationSynchronizationProps) {
  const navigate = useNavigate()
  const {employees: employeesContext, job: jobContext} = useContext(JobContext)
  const [employees] = useState<Employee[]>(employeesContext)
  const [sector] = useState<Sector | undefined>(jobContext?.sector)
  const [workstations, setWorkstations] = useState<Workstation[]>([])
  const [linkedEmployees, setLinkedEmployees] = useState<LinkedEmployee[]>([])

  async function fetchWorkstations() {
    if (sector) {
      if (sector._id) {
        const fetchUC = new FetchAllBySector(new WorkstationService())
        const allWorkstations = await fetchUC.execute(sector._id)
        const allWorkstationsWithoutEmployee = allWorkstations.filter(
          (workstation) => !workstation.employee
        )
        setWorkstations(allWorkstationsWithoutEmployee)
      }
    }
  }

  function linkEmployeeToWorkstation() {
    const employeesToWorkstations: LinkedEmployee[] = []

    for (let i = 0; i < employees.length; i++) {
      employeesToWorkstations.push({
        employee: employees[i],
        workstation: null,
      })
    }

    if (workstations.length >= employees.length) {
      for (let i = 0; i < employees.length; i++) {
        employeesToWorkstations[i].workstation = workstations[i]
      }
    } else {
      for (let i = 0; i < workstations.length; i++) {
        employeesToWorkstations[i].workstation = workstations[i]
      }
    }

    setLinkedEmployees(employeesToWorkstations)
  }

  async function updateWorkstations() {
    const updateUC = new Update(new WorkstationService())

    for (const linkedEmployee of linkedEmployees) {
      if (
        linkedEmployee.workstation &&
        linkedEmployee.workstation._id &&
        sector?._id
      ) {
        await updateUC.execute(linkedEmployee.workstation._id, sector._id, {
          employeeId: linkedEmployee.employee._id,
        })
      }
    }
  }

  async function createJob() {
    if (!process || !process._id || !jobContext) return

    const createUC = new Create(new JobService())
    const createdJob = await createUC.execute(process._id, jobContext)
    return createdJob
  }

  async function handleSubmit() {
    try {
      await updateWorkstations()
      await createJob()
      window.location.reload()
    } catch (error) {
      console.error('Erro ao cadastrar nova atividade.')
      console.error(error)
    }
  }

  function renderCards(linkedEmployee: LinkedEmployee, index: number) {
    return (
      <EmployeeSynchronizationCard
        key={`${index}-${linkedEmployee.employee._id}`}
        linkedEmployee={linkedEmployee}
      ></EmployeeSynchronizationCard>
    )
  }

  useEffect(() => {
    fetchWorkstations()
  }, [])

  useEffect(() => {
    if (employees.length > 0 && workstations.length > 0) {
      linkEmployeeToWorkstation()
    }
  }, [employees, workstations])

  return (
    <div className="workstation__synchronization__page__container">
      <JobHeader
        process={process}
        setCurrentPage={setCurrentPage}
        jobScreenStep={jobScreenStep}
      ></JobHeader>
      <div className="workstation__synchronization__container">
        <WorkstationSynchronizationHeader></WorkstationSynchronizationHeader>

        <div className="employees__synchronization__wrapper">
          {linkedEmployees.map(renderCards)}
        </div>
        <div className="buttons__container">
          <button
            onClick={() => setCurrentPage(2)}
            className="button secondary cancel__button"
          >
            Voltar
          </button>
          <button onClick={handleSubmit} className="button continue__button">
            Prosseguir
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkstationSynchronization
