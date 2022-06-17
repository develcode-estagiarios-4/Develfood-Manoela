import { ReactNode } from "react";

import style from "./style.module.scss";

interface IProps {
  children: ReactNode;
  variant: "red" | "green";
}

export function AlertMessage({ children, variant }: IProps) {
  const isVariantRed = variant === "red";
  const variantClass = isVariantRed ? style.red : style.green;

  return <div className={`${style.button} ${variantClass} `}>{children}</div>;
}
