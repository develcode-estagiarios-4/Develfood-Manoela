import React, { ReactNode } from "react";
import { Control } from "react-hook-form";

import style from "./style.module.scss";

interface IProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  control: Control;
}

export function InputSignIn({
  placeholder,
  type,
  value,
  onChange,
  children,
  control,
}: IProps) {
  return (
    <span className={style.spanInput}>
      <div className={style.iconInput}>{children}</div>
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        className={style.inputForm}
        onChange={(e) => onChange(e)}
      />
    </span>
  );
}
