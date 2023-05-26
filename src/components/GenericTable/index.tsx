import React from 'react'

import TableRow from './TableRow'
import './styles.css'

interface Props {
  columns: string[]
  data: unknown[]
  renderItem: (item: unknown) => JSX.Element
  showColumnName?: boolean
}

export const GenericTable: React.FC<Props> = ({
  columns,
  data,
  renderItem,
  showColumnName: showColumns = true,
}) => {
  function renderColumn(column: string, index: number) {
    return (
      <th key={`column-${index}`} className="table-column">
        {column}
      </th>
    )
  }

  function renderRow(item: unknown, index: number) {
    return <TableRow key={`item-${index}`}>{renderItem(item)}</TableRow>
  }

  return (
    <table className="generic-table">
      {showColumns && (
        <thead className="table-header">
          <tr className="table-row-column">{columns.map(renderColumn)}</tr>
        </thead>
      )}
      <tbody className="table-body">
        {data.length === 0 && (
          <tr>
            <td>
              <label>Não há itens a serem listados.</label>
            </td>
          </tr>
        )}
        {data.map(renderRow)}
      </tbody>
    </table>
  )
}
