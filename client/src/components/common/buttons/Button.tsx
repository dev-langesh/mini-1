import Link from "next/link";
import React from "react";

type ButtonType = {
  text: string;
  type: "button" | "submit" | "reset";
  handleClick?: () => void;
  className?: string;
  href?: string;
};

export default function Button({
  text,
  handleClick,
  type,
  className,
  href,
}: ButtonType) {
  if (href) {
    return (
      <Link
        href={href}
        type={type}
        className={`border-2 border-indigo-600 text-center text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold px-6 py-1 w-full transition-all duration-200 ${className}`}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      type={type}
      className={`border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold px-6 py-1 w-full transition-all duration-200 ${className}`}
    >
      {text}
    </button>
  );
}
