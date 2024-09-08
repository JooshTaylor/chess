import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export function RegisterView(): JSX.Element {
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const registerMutation = useMutation({
    mutationFn: () => {
      return axios.post(`/api/register`, { email, password });
    },
    onSuccess: res => {
      console.log('Successfully registered ', email, res);
    }
  });

  function onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    registerMutation.mutate();
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='email' className='block'>
        Email
        <input
          id='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Enter your email address'
        />
      </label>
      <label htmlFor='password' className='block'>
        Password
        <input
          id='password'
          name='password'
          value={password}
          type='password'
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter a password'
        />
      </label>
      <button type='submit'>
        Register
      </button>
    </form>
  )
}