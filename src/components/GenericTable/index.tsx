import React from 'react'

import './styles.css'
import TableRow from './TableRow'

interface Props {
  columns: string[]
  data: unknown[]
  renderItem: (item: unknown) => JSX.Element
}

export const GenericTable: React.FC<Props> = ({columns, data, renderItem}) => {
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
      <thead className="table-header">
        <tr className="table-row-column">{columns.map(renderColumn)}</tr>
      </thead>
      <tbody className="table-body">{data.map(renderRow)}</tbody>
    </table>
  )
}
