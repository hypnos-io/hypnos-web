import React, {useEffect, useState} from 'react'
import {ImVideoCamera as CameraIcon} from 'react-icons/im'
import {IoMdSearch as SearchIcon} from 'react-icons/io'
import {MdAddCircleOutline as AddIcon} from 'react-icons/md'
import Sidebar from '../../components/Sidebar'

import {GenericTable} from '../../components/GenericTable'
import TableCell from '../../components/GenericTable/TableCell'

import {useNavigate} from 'react-router-dom'
import {Sector} from '../../entities/sector'
import {SectorService} from '../../services/sector_service'
import {FetchAll} from '../../use_cases/sectors/FetchAll'
import './styles.css'

export const CamConfigPage: React.FC = () => {
  const navigate = useNavigate()
  const [sectors, setSectors] = useState<Sector[]>([])

  useEffect(() => {
    async function fetchAll() {
      const fetchAllUC = new FetchAll(new SectorService())
      const allSectors = await fetchAllUC.execute()
      setSectors(allSectors)
    }

    fetchAll()
  }, [])

  function handleConfigPanel(id: string) {
    navigate(`/cameras/${id}`)
  }

  function renderSector(item: unknown) {
    const sector = item as Required<Sector>
    return (
      <>
        <TableCell>{sector.value}</TableCell>
        <TableCell>-</TableCell>
        <TableCell>
          <button
            onClick={() => handleConfigPanel(sector._id)}
            className="button show-config"
          >
            <CameraIcon size={18} />
          </button>
        </TableCell>
      </>
    )
  }

  return (
    <div className="cam-config">
      <Sidebar />
      <div className="container">
        <header className="header">
          <CameraIcon size={36} />
          <h1 className="title">Câmeras</h1>
        </header>

        <main className="main">
          <header className="search-bar">
            <div className="input-group">
              <SearchIcon size={24} className="icon" />
              <input type="text" className="input" placeholder="Buscar" />
            </div>
            <button className="button create-sector">
              <AddIcon size={18} />
              Adicionar setor
            </button>
          </header>

          <GenericTable
            data={sectors}
            columns={['Setor', 'Nº de câmeras', 'Configurar']}
            renderItem={renderSector}
          />
        </main>
      </div>
    </div>
  )
}
