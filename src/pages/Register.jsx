import React from 'react';
import {useState} from 'react'
import { useAuthLogin, useAuthRegister } from '../hooks/useFetchUser'
import { useNavigate } from 'react-router-dom';
import useAuthRedirect from '../hooks/useFectchAutentication';

const AuthComponent = () => {
  useAuthRedirect();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { register, loading: registerLoading, error: registerError } = useAuthRegister();
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const result = await register(username, email, password);
    alert("Usuario Regitrado", result);
    navigate('/login') // Aquí 
  } catch (error) {
    alert("Error al registrar el usuario");
  }


  

};


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#"onSubmit={handleRegister}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create an account</h5>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Your username" onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"  onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account? <a href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AuthComponent;
