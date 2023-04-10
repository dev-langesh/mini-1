import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import Button from "../common/buttons/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ChooseFood() {
  const [foodCode, setFoodCode] = useState<any>({});
  const [data, setData] = useState<any>({
    food_item: "non_veg",
  });
  const [food, setFood] = useState<any>({});

  useEffect(() => {
    async function get() {
      const foodReq = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/food`
      );
      const token = window.localStorage.getItem("token");

      if (token) {
        const foodCodeReq = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/food/code`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("hel");

        console.log(foodReq.data);

        setFood(foodReq.data);

        setFoodCode(foodCodeReq.data);
      }
    }

    get();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({ food_item: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const token = window.localStorage.getItem("token");

    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/food/choose-food-item`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  useEffect(() => {
    console.log("food state", food);
  });

  return (
    <>
      <div className="flex items-center justify-center flex-col space-y-4">
        {food.open_choices && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-[400px] shadow-2xl p-6 mt-20"
          >
            <h1 className="p-4 text-center font-bold text-xl">Choose Food</h1>

            <p className="w-full text-start py-4 text-bold text-slate-500">
              Date: <span>{food.date}</span>
            </p>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Your choice
              </FormLabel>
              <RadioGroup
                onChange={handleChange}
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="non_veg"
                name="radio-buttons-group"
              >
                <FormControlLabel value="veg" control={<Radio />} label="Veg" />
                <FormControlLabel
                  value="non_veg"
                  control={<Radio />}
                  label="Non Veg"
                />
              </RadioGroup>
            </FormControl>
            <button className="border-2  border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold px-6 py-1 transition-all duration-200">
              Submit
            </button>
          </form>
        )}

        {foodCode.food_code && (
          <div className="flex flex-col items-center justify-center shadow-2xl p-6 rounded space-y-2 mt-20">
            {" "}
            <h1 className="text-bold text-2xl font-bold ">Your Food Code</h1>
            <p className="text-slate-500 text-lg">{foodCode.food_code}</p>
          </div>
        )}
      </div>
      {/* <Button text="Submit" type="submit"></Button>
       */}
    </>
  );
}
