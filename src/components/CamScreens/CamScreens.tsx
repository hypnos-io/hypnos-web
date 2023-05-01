import React from "react";
import "C:/Users/callidus/Desktop/Repositórios Github/hypnos-web/src/components/CamScreens/style.css";

function CamScreens({ workstation, devices, onChange }) {
  return (
    <div data-id={workstation} className="video">
      <label>Posto de trabalho #{workstation}</label>
      <video className="camera" autoPlay></video>
      <select
        data-id={workstation}
        className="select-camera secondary"
        onChange={onChange}
        defaultValue={"Nenhuma câmera selecionada"}
      >
        <option>
          Nenhuma câmera selecionada
        </option>
        {devices && devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CamScreens;
