type ValidateEmailProps = {
  register: { email: string };
};

export const ValidateEmail = ({ register }: ValidateEmailProps): string[] => {
  const { email } = register;
  const newError: string[] = [];
  if (email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    console.log(regex.test(email));
    if (regex.test(email)) {
      return newError;
    } else {
      newError.push("correo invalido");
    }
  }
  return newError;
};
