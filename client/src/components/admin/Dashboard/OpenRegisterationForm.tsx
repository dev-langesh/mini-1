import axios from "axios";
import React, { useState } from "react";

export default function OpenRegisterationForm() {
  const [date, setState] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    console.log(date);

    const token = window.localStorage.getItem("token");

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/food/open-registeration`,
      date,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    window.location.reload();
  }

  function handleChange(e: any) {
    setState((p: any) => {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  justify-center w-[300px] space-y-4"
    >
      <h1 className="text-bold py-2 font-bold text-slate-500 text-center">
        Open New Registeration
      </h1>

      <input
        onChange={handleChange}
        type="date"
        name="date"
        className="border p-1"
      />

      <label htmlFor="session">Session</label>

      <select onChange={handleChange} className="p-2" name="session" id="">
        <option value=""></option>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Night">Night</option>
        <option value="Evening">Evening</option>
      </select>

      <input
        type="submit"
        value="submit"
        className="bg-indigo-500 text-white p-1
            "
      />
    </form>
  );
}
