import React, {useEffect, useRef} from 'react'
import {Camera} from '../../entities/camera'
import {Workstation} from '../../entities/workstation'
import { SendWorkstationImages } from '../../use_cases/websocket/sendImages'

import {FPS} from '../../services/websocket/fatigue'
import './styles.css'

interface Props {
  camera: Camera
  workstation?: Workstation
  workstationsWithoutCamera: Workstation[]
  sendWebcamImages: boolean
}

export const Webcam: React.FC<Props> = ({
  camera,
  workstation,
  workstationsWithoutCamera,
  sendWebcamImages: sendWebcamStatus,
}) => {
  const workstationName = workstation
    ? `Posto #${workstation.value}`
    : 'Selecionar posto'
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
    if (sendWebcamStatus && !!workstation) {
      setInterval(sendImage, 1000 / FPS)
    }
  }, [sendWebcamStatus])

  async function sendImage() {
    const buffer = getCurrentFrame()
    if (!buffer) return

    images.push(buffer)
    if (images.length >= 10) {
      console.log(`Enviando imagens de câmera ${camera.name}`)
      await workstationImages.sendImagesWithConnection(images, workstation)
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

  function renderWorkstation(workstations: Workstation, index: number) {
    return (
      <option key={`workstation-option-${index}`}>{workstations.value}</option>
    )
  }

  return (
    <li className="camera">
      <div className="camera-content">
        <div className="description">
          <label className="workstation-name">{workstationName}</label>
          <label className="camera-name">{camera.name}</label>
        </div>
        {/* {!foundWorkstation && <label className="no-signal">SEM SINAL</label>} */}
        <video ref={videoRef} className="camera-source" autoPlay></video>
      </div>
      <select disabled={sendWebcamStatus} className="select">
        {workstationsWithoutCamera.map(renderWorkstation)}
      </select>
    </li>
  )
}
