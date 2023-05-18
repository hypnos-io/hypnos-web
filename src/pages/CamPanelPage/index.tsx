import React, {useEffect, useRef, useState} from 'react'

import {CgCloseO as CloseIcon} from 'react-icons/cg'
import {ImVideoCamera as CameraIcon} from 'react-icons/im'
import {IoMdSearch as SearchIcon} from 'react-icons/io'
import {useLoaderData, useNavigate} from 'react-router-dom'
import {GenericModal} from '../../components/GenericModal'
import Sidebar from '../../components/Sidebar'
import {Webcam} from '../../components/Webcam'
import {Camera} from '../../entities/camera'
import {Workstation} from '../../entities/workstation'
import {CameraService} from '../../services/camera_service'
import {WorkstationService} from '../../services/workstation_service'
import {FetchAll} from '../../use_cases/cameras/FetchAll'
import {Create} from '../../use_cases/workstation/Create'
import {CamPanelLoaderResult} from './camPanelLoader'
import './styles.css'

export const CamPanelPage: React.FC = () => {
  const navigate = useNavigate()
  const [{workstations, sectorId}] = useState<CamPanelLoaderResult>(
    useLoaderData() as CamPanelLoaderResult
  )
  const [workstationsWithoutCamera, setWorkstationsWithoutCamera] = useState<
    Workstation[]
  >([])
  const [cameras, setCameras] = useState<Camera[]>([])
  const workstationModal = useRef<HTMLDialogElement>(null)
  const [sendImages, setSendImages] = useState(false) // TODO Estado que controla o envio de imagens via websocket

  useEffect(() => {
    async function fetchAllCameras() {
      const fetchAllUC = new FetchAll(new CameraService())
      const allCameras = await fetchAllUC.execute()
      setCameras(allCameras)
    }

    fetchAllCameras()
  }, [])

  useEffect(() => {
    setWorkstationsWithoutCamera(
      workstations.filter((workstation) => !workstation.cameraId)
    )
  }, [workstations])

  function renderCamera(camera: Camera, index: number) {
    const foundWorkstation = workstations.find(
      (workstation) => workstation.cameraId === camera.name
    )
    return (
      <Webcam
        key={`camera-${index}`}
        camera={camera}
        workstation={foundWorkstation}
        workstationsWithoutCamera={workstationsWithoutCamera}
        sendWebcamImages={sendImages}
      />
    )
  }

  function openModal() {
    workstationModal?.current?.showModal()
  }

  function closeModal() {
    workstationModal?.current?.close()
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const workstationName = event.currentTarget.workstation.value as string

    const createUC = new Create(new WorkstationService())
    await createUC.execute(sectorId, {value: workstationName})

    navigate(0)
  }

  return (
    <div className="cam-panel">
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
            <button onClick={openModal} className="button create-workstation">
              Adicionar Posto de Trabalho
            </button>
          </header>

          <ul className="cameras">{cameras.map(renderCamera)}</ul>
        </main>
      </div>
      <GenericModal ref={workstationModal}>
        <button onClick={closeModal} className="close-modal">
          <CloseIcon size={28} />
        </button>
        <form className="form" onSubmit={handleSubmit}>
          <legend className="title">Adicionar posto de trabalho</legend>
          <input
            type="text"
            name="workstation"
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
            <button className="button create-workstation" type="submit">
              Adicionar posto de trabalho
            </button>
          </div>
        </form>
      </GenericModal>
    </div>
  )
}
