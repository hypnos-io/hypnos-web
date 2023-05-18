import React from 'react'

interface Props {
  children: React.ReactNode
}

const TableRow: React.FC<Props> = ({children}) => {
  return <tr className="table-row">{children}</tr>
}

export default TableRow
