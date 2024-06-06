import * as Yup from 'yup'


export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Introduce un correo valido')
        .required('Introduce tu correo'),
    password: Yup.string()
        .min(8, 'La contraseña debe tener 8 caracteres o más')
        .required('Introduce tu contraseña')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            'La contraseña debe contener 8 caracteres, una mayúscula, una minúscula y un numero'
        ),
})