'use client'
import { useState } from 'react';

export default function Home() {
  const [usuario, setUsuario] = useState('');

  const handleUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(event.target.value);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Usuario actualizado correctamente!');
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-center text-purple-800">Welcome to Chicago Overview</h1>
        <p className="text-gray-800 text-center mb-6">Enter your username to explore the data</p>
        <form onSubmit={submit} className="flex items-center justify-center">
        <input
          type="text"
          value={usuario}
          onChange={handleUsuarioChange}
          className="border-2 border-purple-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-purple-500 bg-gray-300 text-purple-700"
          placeholder="Your Username"
        />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            Start Exploring
          </button>
        </form>
      </div>
    </div>
  )
}
