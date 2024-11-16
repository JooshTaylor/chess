import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export function LoginView(): JSX.Element {
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const loginMutation = useMutation({
    mutationFn: () => {
      return axios.post(`/api/login?useCookies=true&useSessionCookies=true`, { email, password });
    },
    onSuccess: res => {
      console.log('Successfully logged in ', email, res);
    }
  });

  function onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    loginMutation.mutate();
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
          placeholder='Enter your password'
        />
      </label>
      <button type='submit'>
        Login
      </button>
    </form>
  )
}