type ValidateNameProps = {
  register: { name: string };
};

export const ValidateName = ({ register }: ValidateNameProps) => {
  const { name } = register;
  if (name) {
    return false;
  } else {
    return true;
  }
};
