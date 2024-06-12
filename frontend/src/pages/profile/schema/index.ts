import * as Yup from 'yup'

export const updateProfileValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Nombre debe tener minimo 2 caracteres')
        .required('Nombre es requerido'),
    email: Yup.string()
        .email('Introduce un email valido')
        .required('Email requerido'),
    password: Yup.string()
        .min(8, 'La contraseña debe tener 8 caracteres o más')
        .required('Introduce tu contraseña')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            'La contraseña debe contener 8 caracteres, una mayúscula, una minúscula y un numero'
        ),
    phoneNumber: Yup.string()
        .required('Confirmar numero de telefono')
        .min(8, 'El numero de telefono debe tener mas de 8 numeros'),
})