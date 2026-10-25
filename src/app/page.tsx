"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { sileo, Toaster } from "sileo";
import "sileo/styles.css";
import styles from "./page.module.css";

type Field = "name" | "email" | "interest" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const initialValues: Values = {
  name: "",
  email: "",
  interest: "",
  message: "",
};

function validate(values: Values): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const interest = values.interest.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Escribe tu nombre completo.";
  else if (name.length < 3 || name.length > 100 || name.split(/\s+/).length < 2)
    errors.name = "Escribe nombre y apellido (entre 3 y 100 caracteres).";
  else if (!/^[\p{L}\p{M}'’. \-]+$/u.test(name))
    errors.name = "Usa solo letras y signos propios de un nombre.";

  if (!email) errors.email = "Escribe tu correo de contacto.";
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "Escribe un correo válido, por ejemplo nombre@dominio.com.";

  if (!interest) errors.interest = "Escribe tu área de interés.";
  else if (interest.length < 3 || interest.length > 120)
    errors.interest = "Escribe entre 3 y 120 caracteres.";

  if (!message) errors.message = "Escribe un mensaje.";
  else if (message.length < 10 || message.length > 1000)
    errors.message = "Escribe entre 10 y 1000 caracteres.";

  return errors;
}
function validateField(field: Field, value: string) {
  return validate({ ...initialValues, [field]: value })[field];
}

const shapeRows = [
  ["flower", "circle", "arch", "square", "flower"],
  ["arch", "square", "circle", "arch"],
  ["square", "flower", "circle"],
] as const;

const shapePaths = {
  flower:
    "M20 2 C11 2 5 8 5 16 C5 23 9 28 16 28 C9 28 5 33 5 40 C5 47 9 52 16 52 C9 52 5 57 5 65 C5 73 11 79 20 79 C27 79 32 75 32 68 C32 75 37 79 44 79 C51 79 56 75 56 68 C56 75 61 79 68 79 C76 79 82 73 82 65 C82 58 78 53 71 53 C78 53 82 48 82 41 C82 34 78 29 71 29 C78 29 82 24 82 17 C82 9 76 3 68 3 C61 3 56 7 56 14 C56 7 51 3 44 3 C37 3 32 7 32 14 C32 7 27 2 20 2 Z",
  arch:
    "M26 1 C12 1 1 12 1 26 V82 C1 97 13 100 21 91 C27 100 38 100 44 91 C51 100 62 100 68 91 C78 101 99 97 99 82 V26 C99 12 88 1 74 1 Z",
} as const;

type Shape = (typeof shapeRows)[number][number];

function ShapeIcon({ shape }: { shape: Shape }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {shape === "circle" ? (
        <circle cx="50" cy="50" r="49" />
      ) : shape === "square" ? (
        <rect x="1" y="1" width="98" height="98" rx="31" />
      ) : (
        <path
          d={shapePaths[shape]}
          transform={shape === "flower" ? "translate(-3 -2) scale(1.24)" : undefined}
        />
      )}
    </svg>
  );
}

export default function Home() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [validated, setValidated] = useState(false);

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setValidated(false);
  }

  function validateOnBlur(field: Field) {
    const error = validateField(field, values[field]);
    setErrors((current) => ({ ...current, [field]: error }));

    if (error) {
      sileo.warning({
        title: "Revisa este campo",
        description: error,
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    const emailInput = event.currentTarget.elements.namedItem("email") as HTMLInputElement;

    if (!nextErrors.email && emailInput.validity.typeMismatch) {
      nextErrors.email = "Escribe un correo válido, por ejemplo nombre@dominio.com.";
    }

    setErrors(nextErrors);
    setValidated(Object.keys(nextErrors).length === 0);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) document.getElementById(firstInvalid)?.focus();
  }

  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.site}>
          <Toaster
            position="top-right"
            options={{ duration: 4000, fill: "#fff7e6", roundness: 16 }}
          />

          <header id="inicio" className={styles.hero}>
            <nav className={styles.navigation} aria-label="Navegación principal">
              <a href="#inicio">Inicio</a>
              <a href="#tdo">TDO</a>
              <a href="#proyecto">Proyecto</a>
              <a href="#equipo">Equipo</a>
            </nav>

            <div className={styles.heroBody}>
              <div>
                <h1 className={styles.heroTitle}>
                  Acompañamiento que transforma.
                </h1>
                <p className={styles.heroSubtitle}>
                  Tecnología para acompañar el bienestar emocional y el desarrollo infantil.
                </p>
                <a className={styles.heroButton} href="#proyecto">
                  Conoce el proyecto
                </a>
              </div>
              <Image
                className={styles.robot}
                src="/assets/png/tico.png"
                alt="Tico"
                width={180}
                height={224}
                priority
              />
            </div>
          </header>

          <main>
            <section id="tdo" className={styles.tdo} aria-labelledby="tdo-title">
              <h2 id="tdo-title">Conoce el TDO</h2>
              <p>Comprender es el primer paso para acompañar.</p>
              <div className={styles.shapeGrid} aria-hidden="true">
                {shapeRows.map((row, rowIndex) => (
                  <div className={styles.shapeRow} key={rowIndex}>
                    {row.map((shape, shapeIndex) => (
                      <span className={styles.shape} key={shapeIndex} data-shape={shape}>
                        <ShapeIcon shape={shape} />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.introPanel} aria-label="Bienvenida">
              <div className={styles.creamPiece} aria-hidden="true" />
            </section>

            <section id="proyecto" className={styles.upper} aria-labelledby="page-title">
              <h2 id="page-title" className={styles.title}>
                Alianzas que transforman
              </h2>

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
                  <div className={styles.flowerCopy}>
                    <p>
                      Buscamos conectar con mentes y organizaciones que compartan
                      nuestro deseo de mejorar la salud mental infantil.
                    </p>
                    <p>
                      Si nuestra visión resuena contigo, exploremos cómo podemos
                      colaborar.
                    </p>
                  </div>
                </div>

                <form
                  id="equipo"
                  className={styles.paper}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-labelledby="form-title"
                >
                  <h3 id="form-title" className={styles.formTitle}>
                    Formulario
                  </h3>

                  <div className={styles.field}>
                    <label htmlFor="name">Nombre completo</label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      minLength={3}
                      maxLength={100}
                      value={values.name}
                      onChange={(event) => update("name", event.target.value)}
                      onBlur={() => validateOnBlur("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className={styles.error}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email">Correo de contacto</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={values.email}
                      onChange={(event) => update("email", event.target.value)}
                      onBlur={() => validateOnBlur("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className={styles.error}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="interest">Área de interés</label>
                    <input
                      id="interest"
                      name="interest"
                      required
                      minLength={3}
                      maxLength={120}
                      value={values.interest}
                      onChange={(event) => update("interest", event.target.value)}
                      onBlur={() => validateOnBlur("interest")}
                      aria-invalid={Boolean(errors.interest)}
                      aria-describedby={errors.interest ? "interest-error" : undefined}
                    />
                    {errors.interest && (
                      <span id="interest-error" className={styles.error}>
                        {errors.interest}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message">Mensaje</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={1000}
                      rows={2}
                      value={values.message}
                      onChange={(event) => update("message", event.target.value)}
                      onBlur={() => validateOnBlur("message")}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <span id="message-error" className={styles.error}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button className={styles.submit} type="submit">
                    Enviar
                  </button>
                  {validated && (
                    <p className={styles.status} role="status">
                      Datos válidos. El formulario está listo para conectar el envío.
                    </p>
                  )}
                </form>
              </div>
            </section>
          </main>

          <footer className={styles.footer} aria-label="Pie de página" />
        </div>
      </div>
    </div>
  );
}
