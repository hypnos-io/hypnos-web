import React, {useEffect, useRef} from 'react'
import {Camera} from '../../entities/camera'
import {Workstation} from '../../entities/workstation'

interface Props {
  camera: Camera
  workstation?: Workstation
  workstationsWithoutCamera: Workstation[]
}

export const Webcam: React.FC<Props> = ({
  camera,
  workstation,
  workstationsWithoutCamera,
}) => {
  const workstationName = workstation
    ? `Posto #${workstation.value}`
    : 'Selecionar posto'
  const videoRef = useRef<HTMLVideoElement>(null)

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

  function renderWorkstation(workstations: Workstation, index: number) {
    return (
      <option key={`workstation-option-${index}`}>
        Posto #{workstations.value}
      </option>
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
      <select className="select">
        {workstationsWithoutCamera.map(renderWorkstation)}
      </select>
    </li>
  )
}
