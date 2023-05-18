import Button from "@/components/common/buttons/Button";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const veg =
  "https://www.foodnavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/food-beverage-nutrition/foodnavigator.com/article/2017/09/01/diet-guidelines-should-push-raw-veg-over-cooked-say-researchers/7268230-4-eng-GB/Diet-guidelines-should-push-raw-veg-over-cooked-say-researchers.jpg";
const non_veg =
  "https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80";

export default function LiveResult() {
  const [choice, setChoice] = useState("non");
  const [socket, setSocket] = useState<any>(null);
  const [error, setError] = useState("");

  const isExec = useRef(false);

  useEffect(() => {
    if (!isExec.current) {
      console.log("hello");

      const sc = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

      sc.emit("token", "hello");

      sc.on("token", (meal) => {
        if (meal === "veg" || meal === "non_veg") {
          setChoice(meal);
          setError("");
        } else setError(meal);
      });

      setSocket(sc);

      isExec.current = true;
    }
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center border border-gray-400 p-6">
      <div className="shadow-2xl p-6 rounded-lg flex flex-col gap-6 items-center">
        <h1 className="p-10 text-center font-bold text-xl">Live Result</h1>
        <div className="flex flex-col items-center">
          {error && (
            <h1 className="p-10 text-center font-bold text-xl text-red-500">
              Invalid Token
            </h1>
          )}
          {choice && !error && (
            <img
              src={choice === "veg" ? veg : non_veg}
              width="200px"
              height="200px"
              className="object-cover"
              alt="not found"
            />
          )}
          {!error && (
            <p className="p-2 font-bold text-lg">
              {choice === "veg" ? "VEG" : "NON VEG"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
