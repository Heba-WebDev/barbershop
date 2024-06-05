import { Formik, Form, Field } from 'formik'
import { FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa' // Importa los íconos necesarios
import React, { useState } from 'react'

export const LoginView = () => {
const [ value, setValue] = useState ({
  email: '',
  password: ''
});
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue({ ...value, [event.target.value]: event.target.value });
};
const handleSumbit = () => {
  console.log(value)
}
  return (
    <Formik
      initialValues={{ email: '', password: '', photo: null }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className="flex flex-col items-center justify-center min-h-screen bg-gray-900"> {/* Fondo más oscuro */}
        <div className="w-full max-w-md m-4">
          <div className="mb-4 flex justify-center">
            <label htmlFor="photo-upload" className="cursor-pointer">
              {/* Ícono de usuario en morado y más cuadrado con bordes redondeados */}
              <FaUserCircle className="text-purple-500 text-9xl rounded-full p-1 bg-gray-800" />
              <input
                id="photo-upload"
                name="photo"
                type="file"
                className="hidden"
                onChange={(event) => {
                  // Manejar la carga de la foto aquí
                }}
              />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center">
            <FaEnvelope className="mr-2 text-white" /> {/* Ícono de correo en blanco */}
            <Field
              name="email"
              type="email"
              className="shadow appearance-none border border-gray-500 w-1/2 py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline rounded-full" // Campo de correo con bordes y texto en blanco, y ancho reducido a la mitad
              placeholder="Correo"
            />
          </div>
          <div className="mb-6 flex items-center justify-center">
            <FaLock className="mr-2 text-white" /> {/* Ícono de candado en blanco */}
            <Field
              name="password"
              type="password"
              className="shadow appearance-none border border-gray-500 w-1/2 py-2 px-3 text-white bg-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline rounded-full" // Campo de contraseña con bordes y texto en blanco, y ancho reducido a la mitad
              placeholder="Contraseña"
            />
          </div>
          <div className="flex justify-center"> {/* Contenedor para centrar el botón */}
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-8 focus:outline-none focus:shadow-outline rounded-full" // Botón de login morado con bordes redondeados y más alargado
            >
              Entrar
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
