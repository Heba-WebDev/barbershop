type RegisterInputProps = {
  htmlFor: string;
  labelName: string;
  inputType: string;
  inputName: string;
  placeholder: string;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change events
};

export const RegisterInput = ({
  htmlFor,
  labelName,
  inputType,
  inputName,
  placeholder,
  handleInput,
}: RegisterInputProps) => {
  
  return (
    <div className="">
      <label htmlFor={htmlFor}>
        {labelName}
        <input
          type={inputType}
          name={inputName}
          placeholder={placeholder}
          onChange={(e) => handleInput(e)}
        />
      </label>
    </div>
  );
};
