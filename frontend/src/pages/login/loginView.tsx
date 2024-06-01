import React, { useState } from 'react';

export const LoginView = () => {
  const [value, setValue] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(value);
  }

  return (
    <form className='' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-2'>
        <label htmlFor="email">Correo</label>
        <input
          name="email"
          type="email"
          value={value.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="password">Contraseña</label>
        <input
          name="password"
          type="password"
          value={value.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}
