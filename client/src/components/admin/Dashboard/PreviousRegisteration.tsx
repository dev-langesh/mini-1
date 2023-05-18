import Button from "@/components/common/buttons/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PreviousRegisteration() {
  const [state, setState] = useState<any>({});
  const [reportLink, setReportLink] = useState<boolean>(false);

  useEffect(() => {
    async function get() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/food`);

      if (res.data) {
        // console.log(res.data);
        setState(res.data);
      }
    }

    get();
  }, []);

  // useEffect(() => console.log(state.food));

  async function generateReport() {
    const report = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/food/gen-report`
    );

    console.log(report.data);

    window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}/report.xlsx`, "_blank");
  }

  return (
    <div>
      <h1 className="text-center text-slate-500 font-bold text-xl py-2">
        Current Registeration Records
      </h1>

      <section className="space-y-3">
        <p className="text-slate-500">
          Date:{" "}
          <span className="text-slate-500 font-bold text-lg px-2 ">
            {state.food?.date}
          </span>
        </p>{" "}
        <p className="text-slate-500">
          Session:{" "}
          <span className="text-slate-500 font-bold text-lg px-2 ">
            {state.food?.session}
          </span>
        </p>{" "}
        <p className="text-slate-500">
          Non Veg:{" "}
          <span className="text-slate-500 font-bold text-lg px-2 ">
            {state.food?.non_veg?.length}
          </span>
        </p>{" "}
        <p className="text-slate-500">
          Veg:{" "}
          <span className="text-slate-500 font-bold text-lg px-2 ">
            {state.food?.veg?.length}
          </span>
        </p>
        <p className="text-slate-500">
          Total Users:{" "}
          <span className="text-slate-500 font-bold text-lg px-2 ">
            {state.user_count}
          </span>
        </p>
        <p className="text-slate-500">
          Registered Users:{" "}
          <span className="text-slate-500 font-bold text-lg px-2 ">
            {state.registered_count}
          </span>
        </p>
        <div className="flex flex-col gap-6">
          <Button
            handleClick={generateReport}
            className="w-60"
            type="button"
            text="Download Report"
          ></Button>
          <Button
            href="/validate-token"
            className="w-60"
            type="button"
            text="Validate Token"
          ></Button>
          <Button
            href="/live-result"
            className="w-60"
            type="button"
            text="Live Result"
          ></Button>
        </div>
        {/* <Button className="w-60" type="button" text=""></Button> */}
      </section>
    </div>
  );
}
