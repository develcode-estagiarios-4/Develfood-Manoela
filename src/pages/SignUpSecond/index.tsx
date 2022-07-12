import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import stepper from "../../assets/img/signUpStepperII.png";
import { Logomark } from "../../components";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Input } from "../../components/Input";
import { SelectSignUp } from "../../components/SelectSignUp";
import { useAuth } from "../../context";
import { normalizePhone } from "../../utils/textUtils";
import style from "./style.module.scss";

const schema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  phone: yup
    .string()
    .required("O campo telefone é obrigatório")
    .typeError("Apenas números são permitidos"),
});
export function SignUpSecond() {
  const navigate = useNavigate();

  const { body } = useAuth();
  const [selectedOption, setSelectedOption] = useState([]);
  const [isSelectEmpty, setIsSelectEmpty] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (e: any) => {
    setSelectedOption(e);
    if (e.length === 0) {
      setIsSelectEmpty(true);
    } else {
      setIsSelectEmpty(false);
    }
  };

  function formatSelectedOptions() {
    const optionsList = selectedOption.map((option: any) => {
      const hasValue = !!option.value;
      if (hasValue) {
        const optionObject = { id: option.value };
        return optionObject;
      }
      return "";
    });
    return optionsList;
  }

  const verifySelect = () => {
    if (selectedOption.length === 0) {
      setIsSelectEmpty(true);
    } else {
      setIsSelectEmpty(false);
    }
  };

  const onSubmit = () => {
    if (selectedOption.length === 0) {
      setIsSelectEmpty(true);
    } else {
      navigate("/signupthird");
    }
    const values = getValues();
    body.restaurant.name = values.name;
    body.restaurant.phone = values.phone;
    body.restaurant.foodTypes = formatSelectedOptions();
  };

  return (
    <div className={style.spanSignUp}>
      <form className={style.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.spanLogomark}>
          <Logomark />
        </div>
        <img src={stepper} alt="Second stepper" className={style.stepper} />
        <div className={style.spanForm}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                control={control}
                type="input"
                value={value}
                onChange={onChange}
              >
                <MdIcons.MdAccessibility />
              </Input>
            )}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Controller
            control={control}
            rules={{ required: true }}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                control={control}
                type="tel"
                value={normalizePhone(value)}
                onChange={onChange}
              >
                <MdIcons.MdPhone />
              </Input>
            )}
          />

          <ErrorMessage>{errors.phone?.message}</ErrorMessage>

          <SelectSignUp placeholder="Tipos de comida" onChange={handleChange} />
          {isSelectEmpty ? (
            <ErrorMessage>Escolha uma opção de comida</ErrorMessage>
          ) : (
            ""
          )}

          <Button
            variant="red"
            type="submit"
            onClick={verifySelect}
            className={style.buttonSignUp}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
