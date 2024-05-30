import { ValidatePassword } from "./validateInputPassword";

type ValidateConfirmPasswordProps = {
  register: { password: string; confirmPassword: string };
};

export const ValidateConfirmPassword = ({
  register,
}: ValidateConfirmPasswordProps) => {
  const { password, confirmPassword } = register;
  const newErrors: string[] = [];

  if (password === confirmPassword) {
    newErrors.push("contraseña no coincide");
  }
  const otherErrors = ValidatePassword({ register });
  return [...newErrors, ...otherErrors];
};
