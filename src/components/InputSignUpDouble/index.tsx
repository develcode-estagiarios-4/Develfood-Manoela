import React, { ReactNode } from "react";
import { Control } from "react-hook-form";

import style from "./style.module.scss";

interface IProps {
  placeholder: string;
  type: string;
  value: string;
  children: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  control: Control;
}

export function InputSignUpDouble({
  placeholder,
  type,
  value,
  children,
  onChange,
  control,
}: IProps) {
  return (
    <span className={style.spanInput}>
      <div className={style.iconInput}>{children}</div>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        className={style.inputForm}
        onChange={(e) => onChange(e)}
      />
    </span>
  );
}
