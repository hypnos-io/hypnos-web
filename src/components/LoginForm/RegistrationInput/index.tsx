import React, { ChangeEvent } from 'react';

type ILoginForm = {
  registration: string;
  password: string;
};

type RegistrationInputProps = {
  formData: ILoginForm;
  setFormData: (data: ILoginForm) => void;
};

const RegistrationInput: React.FC<RegistrationInputProps> = ({
  formData,
  setFormData,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <input
        className="Login__input"
        type="text"
        name="registration"
        value={formData.registration}
        onChange={handleInputChange}
        placeholder="Login"
      />
      <small hidden>Insira um login válido</small>
    </>
  );
};

export default RegistrationInput;