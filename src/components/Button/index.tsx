import { ReactNode } from "react";

import style from "./style.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: "red" | "green";
  // className?: any;
}

export function Button({
  children,
  variant = "red",
  className,
  onClick,
}: IProps) {
  const isVariantRed = variant === "red";
  const variantClass = isVariantRed ? style.red : style.green;

  return (
    <button
      type="submit"
      className={`${style.button} ${variantClass} ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
