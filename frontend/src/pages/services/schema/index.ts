import * as Yup from 'yup'

export const addServiceValidationSchema = Yup.object({
    name: Yup.string()
        .required('Introduce un nombre para el servicio')
        .matches(/^[a-zA-Z\s]+$/, 'El nombre del servicio debe contener solo letras y espacios'),
    price: Yup.string()
        .matches(/^\d+(\.\d{1,2})?$/, 'Introduce un precio válido (hasta 2 decimales)')
        .required('Introduce un precio para el servicio'),
})
