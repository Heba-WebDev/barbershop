import { Formik, Form } from "Formik"
import * as Yup from "yup"


export default function Login() {
    const validationSchema = Yup.object({
        email: Yup.string().email("Not a valid email").required("An email is requried"),
        password: Yup.string().required().min(8, "Password must be 8 charachters or more"),
    });
    const initialValues = {
        email: "",
        password: ""
    }
    const handleSubmit = () => {
        
    }
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
            <label>
                {formik.touched.password && formik.errors.email ? (
                  <p className=" text-red-600">{formik.errors.email}</p>
                ) : (
                  "Email"
                )}
            </label>
            <input name="email" onChange={formik.handleChange} value={formik.values.email} />
           </div>
           <div>
            <input name="password" onChange={formik.handleChange} value={formik.values.password} />
           </div>
           <button type="submit">Login</button>
          </Form>
        )}
            </Formik>
        </main>
    )
}