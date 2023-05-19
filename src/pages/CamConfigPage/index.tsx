import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import {CgCloseO as CloseIcon} from 'react-icons/cg'
import {ImVideoCamera as CameraIcon} from 'react-icons/im'
import {IoMdSearch as SearchIcon} from 'react-icons/io'
import {MdAddCircleOutline as AddIcon} from 'react-icons/md'
import Sidebar from '../../components/Sidebar'

import {GenericTable} from '../../components/GenericTable'
import TableCell from '../../components/GenericTable/TableCell'

import {useNavigate} from 'react-router-dom'
import {GenericModal} from '../../components/GenericModal'
import {Sector} from '../../entities/sector'
import {SectorService} from '../../services/sector_service'
import {Create} from '../../use_cases/sectors/Create'
import {FetchAll} from '../../use_cases/sectors/FetchAll'
import './styles.css'

export const CamConfigPage: React.FC = () => {
  const navigate = useNavigate()
  const sectorModal = useRef<HTMLDialogElement>(null)
  const [sectors, setSectors] = useState<Sector[]>([])
  const [sectorsFilter, setSectorsFilter] = useState<Sector[]>([])

  useEffect(() => {
    async function fetchAll() {
      const fetchAllUC = new FetchAll(new SectorService())
      const allSectors = await fetchAllUC.execute()
      setSectors(allSectors)
      setSectorsFilter(allSectors)
    }

    fetchAll()
  }, [])

  function handleConfigPanel(id: string) {
    navigate(`/cameras/${id}`)
  }

  function handleFilter(event: ChangeEvent<HTMLInputElement>) {
    const {value} = event.currentTarget
    const filteredSectors = sectors.filter((sector) =>
      sector.value.toLowerCase().includes(value)
    )
    setSectorsFilter(filteredSectors)
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

  function openModal() {
    sectorModal.current?.showModal()
  }

  function closeModal() {
    sectorModal.current?.close()
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const sectorName = event.currentTarget.sector.value as string

    const createUC = new Create(new SectorService())
    await createUC.execute({value: sectorName})

    navigate(0)
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
              <input
                onChange={handleFilter}
                type="text"
                className="input"
                placeholder="Buscar"
              />
            </div>
            <button onClick={openModal} className="button create-sector">
              <AddIcon size={18} />
              Adicionar setor
            </button>
          </header>

          <GenericTable
            data={sectorsFilter}
            columns={['Setor', 'Nº de câmeras', 'Configurar']}
            renderItem={renderSector}
          />
        </main>
      </div>
      <GenericModal ref={sectorModal}>
        <button onClick={closeModal} className="close-modal">
          <CloseIcon size={28} />
        </button>
        <form className="form" onSubmit={handleSubmit}>
          <legend className="title">Adicionar setor</legend>
          <input
            type="text"
            name="sector"
            placeholder="Digite o nome"
            className="input"
          />
          <div className="actions">
            <button
              onClick={closeModal}
              className="button secondary cancel-form"
            >
              Cancelar
            </button>
            <button className="button create-sector" type="submit">
              Adicionar setor
            </button>
          </div>
        </form>
      </GenericModal>
    </div>
  )
}
