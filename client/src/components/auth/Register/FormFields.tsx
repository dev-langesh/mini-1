import React, { useEffect, useState } from "react";
import { adminInputs, inputs } from "./inputs";

type propType = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type: any;
};

export default function FormFields({ handleChange, type }: propType) {
  const [state, setState] = useState<any>([]);

  useEffect(() => {
    if (type === "admin") {
      setState(adminInputs);
    } else {
      setState(inputs);
    }
  }, []);

  return (
    <>
      {state.map((inp: any, i: any) => {
        return (
          <input
            onChange={handleChange}
            className="border px-2 py-1 text-[15px] outline-none"
            {...inp}
            key={i}
          />
        );
      })}
    </>
  );
}
