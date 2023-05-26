import React, {useContext, useEffect, useState} from 'react'

import {handleImageError} from '../../common/handle_image_error'
import {Employee} from '../../entities/employee'
import {Sector} from '../../entities/sector'
import {EmployeeService} from '../../services/employee_service'
import {FetchAllEmployees} from '../../use_cases/employees/FetchAll'
import {GenericTable} from '../GenericTable'
import TableCell from '../GenericTable/TableCell'
import './styles.css'

import {JobContext} from '../../contexts/JobFlow'
import DefaultImage from '../assets/img/unknown person.jpg'

interface Props {
  setCurrentPage: (page: number) => void
}

export const JobEmployeesTable: React.FC<Props> = ({setCurrentPage}) => {
  const {job, setEmployees: setEmployeesContext} = useContext(JobContext)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])

  const {sector}: {sector?: Sector} = {
    sector: job?.sector,
  }

  useEffect(() => {
    async function fetchAll() {
      const fetchAllUC = new FetchAllEmployees(new EmployeeService())
      const allEmployees = await fetchAllUC.execute()
      setEmployees(allEmployees)
    }

    fetchAll()
  }, [])

  function toggleEmployee(employee: Employee) {
    const isSelected = !!selectedEmployees.find((e) => e._id === employee._id)
    if (isSelected) {
      const allEmployees = selectedEmployees.filter(
        (e) => e._id !== employee._id
      )
      setSelectedEmployees(allEmployees)
    } else {
      setSelectedEmployees([...selectedEmployees, employee])
    }
  }

  function renderEmployee(item: unknown) {
    const employee = item as Employee
    const isSelected = !!selectedEmployees.find((e) => e._id === employee._id)
    return (
      <>
        <TableCell>
          <input
            type="checkbox"
            onChange={() => toggleEmployee(employee)}
            checked={isSelected}
          />
        </TableCell>
        <TableCell>
          <div className="user">
            <img
              onError={(event) => handleImageError(event, DefaultImage)}
              src={employee.imageURL || DefaultImage}
              alt="Imagem de usuário"
            />
            <label className="employee-name">{employee.name}</label>
          </div>
        </TableCell>
        <TableCell>{employee.registration}</TableCell>
        <TableCell>{sector?.value}</TableCell>
      </>
    )
  }

  function handleNextStep() {
    setEmployeesContext(selectedEmployees)
    setCurrentPage(3)
  }

  return (
    <div className="job-employee-table">
      <header className="header">
        <h1 className="title">Adicionar Operários</h1>
      </header>

      <GenericTable
        showColumnName={false}
        data={employees}
        columns={['Seleção', 'Nome', 'Matrícula', 'Setor']}
        renderItem={renderEmployee}
      />

      <div className="actions">
        <button
          onClick={() => setCurrentPage(1)}
          className="button secondary back"
        >
          Voltar
        </button>
        <button onClick={handleNextStep} className="button next">
          Prosseguir
        </button>
      </div>
    </div>
  )
}
