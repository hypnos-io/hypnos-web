import React, {useState} from 'react'

import {Employee} from '../../entities/employee'
import {Sector} from '../../entities/sector'
import {GenericTable} from '../GenericTable'
import TableCell from '../GenericTable/TableCell'
import TableRow from '../GenericTable/TableRow'
import './styles.css'

export const JobEmployeesTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])

  const {employeeSize, sector}: {employeeSize: number; sector: Sector} = {
    employeeSize: 40,
    sector: {value: 'Setor de exemplo'},
  }

  function renderEmployee(item: unknown) {
    const employee = item as Employee

    return (
      <TableRow>
        <TableCell>
          <input type="checkbox" />
        </TableCell>
        <TableCell>
          <img src={employee.imageURL} alt="Imagem de usuário" />
          <label className="employee-name">{employee.name}</label>
        </TableCell>
        <TableCell>{employee.registration}</TableCell>
        <TableCell>{sector.value}</TableCell>
      </TableRow>
    )
  }

  return (
    <div className="job-employee-table">
      <header className="header">
        <h1 className="title">Adicionar Operários</h1>
        <button className="add-batch">
          Adicionar em lote {employeeSize}
          {employeeSize === 1 ? 'operário' : 'operários'}
        </button>
      </header>

      <GenericTable
        showColumnName={false}
        data={employees}
        columns={['Seleção', 'Nome', 'Matrícula', 'Setor']}
        renderItem={renderEmployee}
      />
    </div>
  )
}
