import React from "react";

type Props = {
  form: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
};

export default function StepOne({ form, onChange, error }: Props) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Nombre de usuario"
        value={form.username}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
        minLength={6}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar contraseña"
        value={form.confirmPassword}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
