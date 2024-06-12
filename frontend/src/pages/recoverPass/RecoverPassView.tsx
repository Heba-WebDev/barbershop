
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { callForgotPassword } from './api/callForgotPassword';
import { ForgotPasswordBody } from './types/ForgotPasswordRequestBody';
export const RecoverPassView = () => {

    const recoverPassSchema = Yup.object().shape({
        email: Yup.string().email('Email invalido').required('No ha escrito un email'),
      });

    const handleSubmit=(data:ForgotPasswordBody)=>{
        callForgotPassword(data);
        console.log(data)
    }
  return (
    <div className="flex justify-center items-center h-[85vh]">
        <div className="max-w-lg mx-auto my-10 bg-gray-800 p-8 rounded-xl shadow shadow-blue-200 ">
                <h1 className="text-3xl font-medium text-indigo-200">Reestablecer contraseña</h1>
                <p className="text-blue-100 mt-2">Escriba el email asociado a su cuenta:</p>

                <Formik
                    initialValues={{
                        email:'',
                    }}
                    validationSchema={recoverPassSchema}
                    onSubmit={handleSubmit}
                >

                    {()=>(
                        <Form className="my-6">
                                <div className="flex flex-col space-y-5">
                                    <label htmlFor="email">
                                        <p className="font-medium text-slate-200 pb-2">Correo Electronico [Email]:</p>
                                        <Field id="email" name="email" type="email" className="text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="albicho@siuu.com" />
                                        <ErrorMessage name="email" component="div" className='bg-red-700 rounded-xl text-center mt-3' />
                                    </label>
                                
                                    <button type='submit'
                                        className="w-full py-4 font-medium text-white bg-cyan-500 hover:bg-indigo-500 rounded-lg border-indigo-500 transition-all hover:shadow inline-flex space-x-2 items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                        </svg>
                                        
                                        <span>¡Quiero mi nueva contraseña!</span>
                                    </button>
                                    

                                    <p className="text-center text-xs">¿Aún no te has registrado? <a href="/register" className="text-indigo-200 font-medium inline-flex space-x-1 items-center"><span>Registrate ahora </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg></span></a></p>
                                </div>
                            </Form>
                    )}
                                
                </Formik>



                
            </div>
    </div>
    
  )
}
