import React, { InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { Control, FieldValues } from "react-hook-form";

import style from "./style.module.scss";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  control: FieldValues | any;
}

export function TextArea({ placeholder, value, onChange, control }: IProps) {
  return (
    <textarea
      className={style.textarea}
      onChange={(e) => onChange(e)}
      value={value}
      placeholder={placeholder}
    />
  );
}
