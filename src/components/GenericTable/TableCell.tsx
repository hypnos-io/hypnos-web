import React from 'react'

interface Props {
  children: React.ReactNode
}

const TableCell: React.FC<Props> = ({children}) => {
  return <td className="table-cell">{children}</td>
}

export default TableCell;
