import React from "react";
import { Country, State, City } from "country-state-city";

type Props = {
  form: {
    country: string;
    state: string;
    city: string;
    birthDate: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export default function StepTwo({ form, onChange }: Props) {
  const countries = Country.getAllCountries();
  const states = form.country ? State.getStatesOfCountry(form.country) : [];
  const cities = form.state
    ? City.getCitiesOfState(form.country, form.state)
    : [];

  return (
    <div className="space-y-4">
      <select
        name="country"
        value={form.country}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      >
        <option value="">Selecciona un país</option>
        {countries.map((c) => (
          <option key={c.isoCode} value={c.isoCode}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        name="state"
        value={form.state}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
        disabled={!form.country}
      >
        <option value="">Selecciona un estado</option>
        {states.map((s) => (
          <option key={s.isoCode} value={s.isoCode}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        name="city"
        value={form.city}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
        disabled={!form.state}
      >
        <option value="">Selecciona una ciudad</option>
        {cities.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="birthDate"
        value={form.birthDate}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />
    </div>
  );
}
