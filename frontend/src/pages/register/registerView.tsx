import { Formik, Form } from 'formik'
import * as Yup from 'yup'

export const RegisterView = () => {
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'nombre debe tener minimo 2 caracteres')
            .required('nombre es requerido'),
        email: Yup.string()
            .email('no es un email valido')
            .required('email requerido'),
        password: Yup.string()
            .required('la contraseña es requerida')
            .min(8, 'la contraseña debe tener 8 caracteres o más')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'la contraseña no coincide')
            .required('confirmar contraseña es requerido'),
    })
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const handleSubmit = () => {}

    return (
        <main>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form>
                        <div>
                            <label>Nombre :</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="escribe tu nombre"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            {formik.errors.name && formik.touched.password ? (
                                <p className=" text-red-600">{formik.errors.name}</p>
                            ) : (
                                ''
                            )}
                        </div>
                        <div>
                            <label>Correo electronico :</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="registro@ejemplo.com"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.touched.password ? (
                                <p className=" text-red-600">{formik.errors.email}</p>
                            ) : (
                                ''
                            )}
                        </div>
                        <div>
                            <label>Contraseña :</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="escribe tu contraseña"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {formik.touched.password && (
                                <p className=" text-red-600">{formik.errors.password}</p>
                            )}
                        </div>
                        <div>
                            <label>Confirmar contraseña :</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="confirma tu contraseña"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                            {formik.touched.confirmPassword && (
                                <p className=" text-red-600">{formik.errors.confirmPassword}</p>
                            )}
                        </div>
                        <button type="submit">Registrarme</button>
                    </Form>
                )}
            </Formik>
            <div>
                <span>Ya tienes una cuenta?</span>
                <a href="/login">Entrar</a>
            </div>
        </main>
    )
}
