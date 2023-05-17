import React, {useEffect, useState} from 'react'

import {ImVideoCamera as CameraIcon} from 'react-icons/im'
import {IoMdSearch as SearchIcon} from 'react-icons/io'
import {MdCamera as CameraLensIcon} from 'react-icons/md'
import {useLoaderData} from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import {Webcam} from '../../components/Webcam'
import {Camera} from '../../entities/camera'
import {Workstation} from '../../entities/workstation'
import {CameraService} from '../../services/camera_service'
import {FetchAll} from '../../use_cases/cameras/FetchAll'
import './styles.css'

export const CamPanelPage: React.FC = () => {
  const [workstations] = useState<Workstation[]>(
    useLoaderData() as Workstation[]
  )
  const [workstationsWithoutCamera, setWorkstationsWithoutCamera] = useState<
    Workstation[]
  >([])
  const [cameras, setCameras] = useState<Camera[]>([])

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
      workstations.filter((workstation) => !!workstation.cameraId)
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
      />
    )
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
            <button className="button create-camera">
              <CameraLensIcon size={24} />
              Adicionar câmera
            </button>
          </header>

          <ul className="cameras">{cameras.map(renderCamera)}</ul>
        </main>
      </div>
    </div>
  )
}
