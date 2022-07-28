import { ReactNode } from "react";

import style from "./style.module.scss";

const defaultProps = {
  classNameErrorMessage: "",
};

interface IErrorMessage {
  children: ReactNode;
  classNameErrorMessage?: string;
}
export function ErrorMessage({
  children,
  classNameErrorMessage,
}: IErrorMessage & typeof defaultProps) {
  return (
    <div className={`${style.errorMessage} ${classNameErrorMessage}`}>
      {children}
    </div>
  );
}

ErrorMessage.defaultProps = defaultProps;
