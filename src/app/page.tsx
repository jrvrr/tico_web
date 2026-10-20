"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.site}>
          <header id="inicio" className={styles.hero}>
            <nav className={styles.navigation} aria-label="Navegación principal">
              <a href="#inicio">Inicio</a>
              <a href="#tdo">TDO</a>
              <a href="#proyecto">Proyecto</a>
              <a href="#equipo">Equipo</a>
            </nav>
            <div className={styles.heroBody}>
              <div>
                <h1>Acompañamiento que transforma.</h1>
                <p id="tdo">Tecnología para acompañar el bienestar emocional y el desarrollo infantil.</p>
                <a className={styles.heroButton} href="#proyecto">Conoce el proyecto</a>
              </div>
              <Image className={styles.robot} src="/assets/png/tico.png" alt="Tico" width={180} height={224} priority />
            </div>
          </header>

          <section className={styles.introPanel} aria-label="Bienvenida">
            <div className={styles.creamPiece} aria-hidden="true" />
          </section>

          <section id="proyecto" className={styles.project} aria-labelledby="project-title">
            <h2 id="project-title">Alianzas que transforman</h2>
            <div className={styles.content}>
              <div className={styles.flower}>
                <svg className={styles.flowerShape} viewBox="0 0 296 296" aria-hidden="true">
                  <rect x="37" y="37" width="222" height="222" />
                  {[37, 111, 185, 259].map((x) => (
                    <g key={x}>
                      <circle cx={x} cy="37" r="37" />
                      <circle cx={x} cy="259" r="37" />
                    </g>
                  ))}
                  {[111, 185].map((y) => (
                    <g key={y}>
                      <circle cx="37" cy={y} r="37" />
                      <circle cx="259" cy={y} r="37" />
                    </g>
                  ))}
                </svg>
                <p>Buscamos conectar con mentes y organizaciones que compartan nuestro deseo de mejorar la salud mental infantil.</p>
                <p>Si nuestra visión resuena contigo, exploremos cómo podemos colaborar.</p>
              </div>

              <form id="equipo" className={styles.form} onSubmit={handleSubmit}>
                <h3>Formulario</h3>
                <label htmlFor="name">Nombre completo</label>
                <input id="name" name="name" autoComplete="name" required />
                <label htmlFor="email">Correo de contacto</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
                <label htmlFor="interest">Área de interés</label>
                <input id="interest" name="interest" required />
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" name="message" rows={3} required />
                <button type="submit">Enviar</button>
                {sent && <p className={styles.status} role="status">Gracias, recibimos tus datos.</p>}
              </form>
            </div>
          </section>
          <footer className={styles.footer} aria-label="Pie de página" />
        </div>
      </div>
    </main>
  );
}
