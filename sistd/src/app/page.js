"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./page.module.css";

export default function Home() {
  const [personas, setPersonas] = useState([]);
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    edad: ''
  });

  useEffect(() => {
    // Obtener la lista de personas al cargar el componente
    axios.get('http://servicionube-production.up.railway.app/personas')
      .then(response => {
        setPersonas(response.data);
      })
      .catch(error => {
        console.error('Error obteniendo personas:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://servicionube-production.up.railway.app/addpersona', formData)
      .then(response => {
        alert(response.data);
        // Actualizar la lista de personas
        return axios.get('http://servicionube-production.up.railway.app/personas');
      })
      .then(response => {
        setPersonas(response.data);
      })
      .catch(error => {
        console.error('Error agregando persona:', error);
      });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Gestión de Personas</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Agregar Persona</h2>
        <div className={styles.formGroup}>
          <label htmlFor="cedula">Cédula</label>
          <input type="text" id="cedula" name="cedula" placeholder="Cédula" value={formData.cedula} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="apellido">Apellido</label>
          <input type="text" id="apellido" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="edad">Edad</label>
          <input type="number" id="edad" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>Agregar Persona</button>
        </div>
      </form>

      <div className={styles.personas}>
        <h2>Lista de Personas</h2>
        <ul>
          {personas.map((persona) => (
            <li key={persona.Cedula} className={styles.personaItem}>
              {persona.nombre} {persona.apellido} - {persona.edad} años
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
