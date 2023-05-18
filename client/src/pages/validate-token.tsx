import Button from "@/components/common/buttons/Button";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const veg =
  "https://www.foodnavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/food-beverage-nutrition/foodnavigator.com/article/2017/09/01/diet-guidelines-should-push-raw-veg-over-cooked-say-researchers/7268230-4-eng-GB/Diet-guidelines-should-push-raw-veg-over-cooked-say-researchers.jpg";
const non_veg =
  "https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80";

export default function ValidateToken() {
  const [choice, setChoice] = useState("non");
  const [code, setCode] = useState(null);
  const [error, setError] = useState({ msg: "", open: false });
  const [socket, setSocket] = useState<any>(null);

  const isExec = useRef(false);

  useEffect(() => {
    if (!isExec.current) {
      const sc = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

      setSocket(sc);

      isExec.current = true;
    }
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    socket.emit("token", code);

    const req = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/food/validate-token`,
      { code }
    );

    if (!req.data.error) {
      setChoice(req.data.meal);
    } else {
      setError({ open: true, msg: req.data.error });
    }
  }

  const closeError = () => {
    setError((prev) => ({ ...prev, open: false }));

    setTimeout(() => {
      setError({ open: false, msg: "" });
    }, 400);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center border border-gray-400 p-6">
      <h1 className="p-10 text-center font-bold text-2xl">Live Result</h1>
      <div className="shadow-2xl p-6 rounded-lg flex gap-6 items-center">
        <form onSubmit={handleSubmit} className="w-1/2 space-y-2" action="">
          <label htmlFor="" className="text-lg font-bold">
            Food Token
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter food token"
            className="border p-2"
            onChange={(e: any) => setCode(e.target.value)}
          />
          <Button type="submit" text="Submit"></Button>
        </form>

        <div className="flex flex-col items-center">
          {choice && (
            <img
              src={choice === "veg" ? veg : non_veg}
              width="200px"
              height="200px"
              className="object-cover"
              alt="not found"
            />
          )}
          {choice === "veg" ? "VEG" : "NON VEG"}
        </div>
      </div>

      <Snackbar open={error.open} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error">
          {error.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
