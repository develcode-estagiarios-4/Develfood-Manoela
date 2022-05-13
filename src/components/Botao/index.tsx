import style from "./style.module.scss";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Props {
  onClick: () => void;
  children?: string;
}

// eslint-disable-next-line react/function-component-definition, react/prop-types
export const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button" className={style.botaoInput}>
      {children}
    </button>
  );
};
