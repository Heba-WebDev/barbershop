import React, { useState } from 'react';

export const LoginView = () => {
const [ value, setValue] = useState ({
  email: '',
  password: ''
});
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue({ ...value, [event.target.value]: event.target.value });
};
const handleSumbit = () => {
  console.log(value)
}
  return (
   <form className=''>
    <div className='flex flex-col gap-2'>
    <label>Correo</label>
    <input
    type="email"
    value={value.email}
    onChange={handleInputChange}
    placeholder= "Enter your username" />
    </div>

    <div className='flex flex-col gap-2'>
    <label>password</label>
    <input
    type="password"
    value={value.password}
    onChange={handleInputChange}
    placeholder= "Enter your password" />
    </div>
    <button type='submit' onSubmit={handleSumbit}>Login</button>
  </form>
  )
}
