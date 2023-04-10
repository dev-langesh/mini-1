import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PreviousRegisteration() {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    async function get() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/food`);

      if (res.data.length !== 0) {
        setState(res.data);
      }
    }

    get();
  }, []);

  return (
    <div>
      <h1 className="text-center text-slate-500 font-bold text-xl py-2">
        Current Registeration Records
      </h1>

      <section className="space-y-3">
        <p className="text-slate-500">
          Date:{" "}
          <span className="text-slate-500 font-bold text-lg px-2 ">
            {state.date}
          </span>
        </p>{" "}
        <p className="text-slate-500">
          Non Veg:{" "}
          <span className="text-slate-500 font-bold text-lg px-2 ">
            {state.non_veg?.length}
          </span>
        </p>{" "}
        <p className="text-slate-500">
          Veg:{" "}
          <span className="text-slate-500 font-bold text-lg px-2 ">
            {state.veg?.length}
          </span>
        </p>
      </section>
    </div>
  );
}
