type ValidatePasswordProps = {
  register: { password: string };
  minLength?: number; // Optional minimum password length (default: 8)
  require?: string[]; // Optional required character types (default: ['lowercase', 'uppercase', 'number', 'special'])}
};
export const ValidatePassword = ({
  register,
  minLength = 8,
}: ValidatePasswordProps): string[] => {
  const { password } = register;
  console.log(password);
  const newErrors: string[] = [];
  if (password.length <= minLength) {
    newErrors.push(`La contraseña debe tener al menos ${minLength} caracteres`);
  }
  if (!/[a-z]/.test(password)) {
    newErrors.push("La contraseña debe contener al menos una letra minúscula");
  }
  if (!/[A-Z]/.test(password)) {
    newErrors.push("La contraseña debe contener al menos una letra mayúscula");
  }
  if (!/\d/.test(password)) {
    newErrors.push("La contraseña debe contener al menos un número");
  }

  return newErrors;
};
