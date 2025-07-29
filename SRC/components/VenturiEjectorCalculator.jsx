import { useState } from "react";

export default function VenturiEjectorCalculator() {
  const [mDot, setMDot] = useState(1);       
  const [rho, setRho] = useState(1.2);       
  const [area, setArea] = useState(0.2);     
  const [pInBar, setPInBar] = useState(7);   
  const [pAmbBar, setPAmbBar] = useState(1); 

  const pIn = pInBar * 1e5;
  const pAmb = pAmbBar * 1e5;
  const deltaP = pIn - pAmb;
  const vAsp = mDot / (rho * area);
  const vJet = Math.sqrt((2 * deltaP) / rho);
  const force = mDot * vAsp;
  const mDotJet = force / vJet;
  const R = mDot / mDotJet;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Calcolatore Eiettore Venturi</h1>

      <div className="space-y-4 bg-white shadow-md rounded-xl p-6">
        <InputField label="Portata Aspirata (kg/s)" value={mDot} onChange={setMDot} />
        <InputField label="Densità Aria (kg/m³)" value={rho} onChange={setRho} />
        <InputField label="Sezione Condotto (m²)" value={area} onChange={setArea} />
        <InputField label="Pressione Ingresso (bar)" value={pInBar} onChange={setPInBar} />
        <InputField label="Pressione Ambiente (bar)" value={pAmbBar} onChange={setPAmbBar} />
      </div>

      <div className="bg-gray-100 p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Risultati</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Velocità Aspirazione:</strong> {vAsp.toFixed(2)} m/s</li>
          <li><strong>Velocità Getto:</strong> {vJet.toFixed(2)} m/s</li>
          <li><strong>Forza:</strong> {force.toFixed(2)} N</li>
          <li><strong>Portata Getto:</strong> {mDotJet.toFixed(3)} kg/s</li>
          <li><strong>Rapporto R:</strong> {R.toFixed(3)}</li>
        </ul>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
