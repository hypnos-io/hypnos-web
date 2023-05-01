import React from "react"
import { getCameras, open } from "../../camera.js";
import { FetchAll } from "../../use_cases/workstation/FetchAll.js";
import { WorkstationService } from "../../services/workstation_service.js";
import { useState, useEffect } from "react";
import "C:/Users/callidus/Desktop/Repositórios Github/hypnos-web/src/pages/CamsPage/style.css";
import CamScreens from "../../components/CamScreens/CamScreens.js";


function CamsPage() {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [workstations, setWorkstations] = useState<string[]>([]);
  
    useEffect(() => {
      async function fetchDevices() {
        const allDevices = await getCameras();
        setDevices(allDevices);
      }
      fetchDevices();
    }, []);
  
    useEffect(() => {
      async function fetchWorkstations() {
        const workStationService = new WorkstationService();
        const fetchAll = new FetchAll(workStationService);
        const numStations = await fetchAll.execute();
        const stations = Array.from({ length: numStations.length }, (_, i) => numStations[i].value);
        console.log(stations)
        setWorkstations(stations);
      }
      fetchWorkstations();
    }, []);
  
    useEffect(() => {
      function handleCameraChange(event) {
        const { value: deviceId } = event.target;
        const video = document.querySelector(
          `.videos .video[data-id='${event.target.dataset.id}'] .camera`
        );
        open(video, deviceId);
      }
  
      const cameraSelections = document.querySelectorAll(".video .select-camera");
      for (const cameraSelect of cameraSelections) {
        cameraSelect.addEventListener("change", handleCameraChange);
      }
  
      return () => {
        for (const cameraSelect of cameraSelections) {
          cameraSelect.removeEventListener("change", handleCameraChange);
        }
      };
    }, []);
  
    return (
      <div className="container">
        <h1>Página de Detecção</h1>
         <div className="videos">
  {workstations && workstations.map((workstation) => (
    <CamScreens
      workstation={workstation}
      devices={devices}
      onChange={(event) => {
        const { value: deviceId } = event.target;
        const video = document.querySelector(
          `.videos .video[data-id='${event.target.dataset.id}'] .camera`
        );
        open(video, deviceId);
      }}
    />
  ))}
</div>
      </div>
    );
  }
  
  export default CamsPage;