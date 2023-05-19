import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import {Camera} from '../../entities/camera'
import {Workstation} from '../../entities/workstation'
import { SendWorkstationImages } from '../../use_cases/websocket/SendImages'
import { ConnectSocket } from '../../use_cases/websocket/Connect'
import {useNavigate} from 'react-router-dom'
import {FPS} from '../../services/websocket/fatigue'
import {WorkstationService} from '../../services/workstation_service'
import {Update} from '../../use_cases/workstation/Update'
import './styles.css'
import { Socket } from 'socket.io-client'

interface Props {
  camera: Camera
  workstationAssociated?: Workstation
  sectorId: string
  socket?: Socket
  workstationsWithoutCamera: Workstation[]
  sendWebcamImages: boolean
}

export const Webcam: React.FC<Props> = ({
  camera,
  workstationAssociated,
  sectorId,
  socket,
  workstationsWithoutCamera,
  sendWebcamImages: sendWebcamStatus,
}) => {
  const navigate = useNavigate()
  const [workstationName, setWorkstationName] = useState(
    workstationAssociated?.value
  )
  const videoRef = useRef<HTMLVideoElement>(null)
  let images: string[] = []
  const workstationImages = new SendWorkstationImages();

  useEffect(() => {
    async function openCamera() {
      const mediaDevice = navigator.mediaDevices
      const stream = await mediaDevice.getUserMedia({
        video: {
          deviceId: camera.deviceId,
        },
      })
      if (videoRef && videoRef.current) videoRef.current.srcObject = stream
    }

    openCamera()
  }, [videoRef])

  useEffect(() => {
    console.log(workstationAssociated)
    setWorkstationName(workstationAssociated?.value)
  }, [workstationAssociated])

  useEffect(() => {
    if (sendWebcamStatus && !!workstationAssociated) {
      setInterval(sendImage, 1000 / FPS)
    }
  }, [sendWebcamStatus])

  async function sendImage() {
    const buffer = getCurrentFrame()
    if (!buffer) return

    images.push(buffer)
    if (images.length >= 10) {
      console.log(`Enviando imagens de câmera ${camera.name}`)
      if (workstationAssociated !== undefined && socket !== undefined)
        await workstationImages.sendImagesWithConnection(socket, images, workstationAssociated);
      images = []
    }

    function getCurrentFrame() {
      const video = videoRef.current
      if (!video) {
        console.error(`Câmera ${camera.name} não foi inicializada.`)
        return
      }
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')

      if (!context) {
        console.error(
          `Não foi possível capturar imagem de câmera ${camera.name}`
        )
        return
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      const buffer = canvas.toDataURL('image/png')
      return buffer
    }
  }

  function renderWorkstation(workstation: Workstation, index: number) {
    const isChecked =
      !!workstationAssociated && workstation._id === workstationAssociated._id
    return (
      <option
        defaultChecked={isChecked}
        key={`workstation-option-${index}`}
        value={workstation?._id}
      >
        {workstation.value}
      </option>
    )
  }

  async function handleUpdateWorkstation(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    const {value} = event.target
    const updateUC = new Update(new WorkstationService())

    await updateUC.execute(value, sectorId, {
      cameraId: camera.name,
    })

    navigate(0)
  }

  return (
    <li className="camera">
      <div className="camera-content">
        <div className="description">
          <label className="workstation-name">
            {workstationName || 'Selecionar posto'}
          </label>
          <label className="camera-name">{camera.name}</label>
        </div>
        {!workstationName && sendWebcamStatus && (
          <label className="no-signal">SEM POSTO ASSOCIADO</label>
        )}
        <video ref={videoRef} className="camera-source" autoPlay></video>
      </div>
      <select
        onChange={handleUpdateWorkstation}
        defaultValue={workstationAssociated?._id}
        disabled={sendWebcamStatus}
        className="select"
      >
        <option defaultChecked={!workstationName}>
          Selecione um posto de trabalho
        </option>
        {workstationsWithoutCamera.map(renderWorkstation)}
      </select>
    </li>
  )
}
