'use client';

import { useEffect, useState } from 'react';
import { getTipoCambio } from './getTipoCambio';
import './TipoCambio.css'; // Importa la hoja de estilos

interface TipoCambioProps {
  fecha: string | null;
  referencia: string | null;
}

const TipoCambio = () => {
  const [data, setData] = useState<TipoCambioProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tipoCambioData = await getTipoCambio();
        console.log('Datos obtenidos:', tipoCambioData);
        setData(tipoCambioData);
      } catch (err) {
        setError('Failed to load data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="tipo-cambio-card">
      <h2>Tipo de Cambio</h2>
      <p><strong>Fecha:</strong> {data.fecha}</p>
      <p><strong>Referencia:</strong> {data.referencia}</p>
    </div>
  );
};

export default TipoCambio;
