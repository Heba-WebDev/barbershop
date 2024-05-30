/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { RegisterInput } from "./registerInputs";
import { ValidateName } from "../../utils/validateInputs/validateInputName";
import { ValidateEmail } from "../../utils/validateInputs/validateInputEmail";
import { ValidatePassword } from "../../utils/validateInputs/validateInputPassword";
import { ValidateConfirmPassword } from "../../utils/validateInputs/validateInputConfirmPassword";
type Register = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterView: FC = () => {
  const [register, setRegister] = useState<Register>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validateInputName, setValidateInputName] = useState(false);
  const [validateInputEmail, setValidateInputEmail] = useState<string[]>([]);
  const [validateInputPassword, setValidateInputPassword] = useState<string[]>(
    []
  );
  const [validateInputConfirmPassword, setValidateInputConfirmPassword] =
    useState<string[]>([]);
  const algo = ValidatePassword({ register });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    if (name === "password") {
      setValidateInputPassword(algo); 
    }
    setValidateInputName(ValidateName({ register }));

    console.log(name, value);
    setValidateInputEmail(ValidateEmail({ register }));
    setValidateInputConfirmPassword(ValidateConfirmPassword({ register }));
  };
  console.log(validateInputEmail);
  return (
    <section className="">
      <h2>Registro</h2>
      <form>
        <RegisterInput
          htmlFor="name"
          labelName="Nombre:"
          inputType="name"
          inputName="name"
          placeholder="escribe tu nombre"
          handleInput={handleInput}
        />
        <RegisterInput
          htmlFor="email"
          labelName="Email:"
          inputType="email"
          inputName="email"
          placeholder="escribe tu correo electronico"
          handleInput={handleInput}
        />
        {validateInputEmail.length > 0 &&
          validateInputEmail.map((item, index) => <p key={index}>{item}</p>)}

        <RegisterInput
          htmlFor="password"
          labelName="Contraseña:"
          inputType="password"
          inputName="password"
          placeholder="escribe tu contraseña"
          handleInput={handleInput}
        />
        {validateInputPassword.length > 0 &&
          validateInputPassword.map((item, index) => <p key={index}>{item}</p>)}
        <RegisterInput
          htmlFor="confirmPassword"
          labelName="Confirmar contraseña:"
          inputType="password"
          inputName="confirmPassword"
          placeholder="confirma tu contraseña"
          handleInput={handleInput}
        />
        {validateInputConfirmPassword.length > 0 &&
          validateInputConfirmPassword.map((item, index) => (
            <p key={index}>{item}</p>
          ))}

        <div className="input-button">
          <button onSubmit={() => {
            
          }}>Registrarme</button>
        </div>
      </form>
      <div>
        <a href="/">Iniciar sesión</a>
      </div>
    </section>
  );
};
