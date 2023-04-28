import React from "react"
import Screen from "../components/CamScreens";
import { getCameras, open } from "../camera.js";
import { FindAll } from "../use_cases/workStations/FindAll.js";
import WorkStationService from "../services/WorkStationService.js";
import { useState, useEffect } from "react";
import "C:/Users/callidus/Desktop/Repositórios Github/hypnos-web/style.css";
import CamScreens from "../components/CamScreens";


function CamPage() {
    const [devices, setDevices] = useState([]);
    const [workstations, setWorkstations] = useState([]);
  
    useEffect(() => {
      async function fetchDevices() {
        const allDevices = await getCameras();
        setDevices(allDevices);
      }
      fetchDevices();
    }, []);
  
    useEffect(() => {
      async function fetchWorkstations() {
        const workStationService = new WorkStationService();
        const findAll = new FindAll(workStationService);
        const numStations = await findAll.execute();
        const stations = Array.from({ length: numStations }, (_, i) => i + 1);
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
  
  export default CamPage;