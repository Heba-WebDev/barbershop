import * as Yup from 'yup'

export const companyValidationSceham = Yup.object({
    name: Yup.string()
        .min(2, 'Nombre debe tener minimo 2 caracteres')
        .required('Nombre es requerido'),
    phone_number: Yup.string()
        .required('Confirmar numero de telefono')
        .min(8),
    address: Yup.string()
        .required('Introduce la dirección del negocio')
        .min(5, 'Introduce una dirección valida')
})