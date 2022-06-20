import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as MdIcons from "react-icons/md";
import * as yup from "yup";

import stepper from "../../assets/img/signUpStepperIII.png";
import { Logomark, Loader } from "../../components";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Input } from "../../components/Input";
import { useAuth } from "../../context";
import { signUp } from "../../hooks/useSignUp";
import { removeLetters } from "../../utils/textUtils";
import { newDate } from "../../utils/todayDate";

import style from "./style.module.scss";

const schema = yup.object().shape({
  nickname: yup.string().required("O campo Apelido é obrigatório"),
  zipCode: yup
    .number()
    .required("O campo CEP é obrigatório")
    .typeError("Apenas números são permitidos"),
  street: yup.string().required("O campo Rua é obrigatório"),
  city: yup.string().required("O campo Cidade é obrigatório"),
  neighborhood: yup.string().required("O campo Bairro é obrigatório"),
  state: yup.string().required("O campo Estado é obrigatório"),
  number: yup
    .number()
    .required("O campo número é obrigatório")
    .typeError("Apenas números são permitidos"),
});
export function SignUpThird() {
  const { body } = useAuth();
  const { signUpPost, signUpSucceeded } = signUp();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    const createdData = newDate();
    const values = getValues();
    body.restaurant.address.nickname = values.nickname;
    body.restaurant.address.zipCode = values.zipCode;
    body.restaurant.address.street = values.street;
    body.restaurant.address.city = values.city;
    body.restaurant.address.neighborhood = values.neighborhood;
    body.restaurant.address.number = values.number;
    body.restaurant.address.state = values.state;
    body.creationDate = createdData;
    signUpPost(body);
    console.log(values);
    console.log(body);
    console.log(signUpSucceeded);
  };
  return (
    <>
      <div className={style.spanSignUp}>
        <form className={style.signUpForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.spanLogomark}>
            <Logomark />
          </div>
          <img src={stepper} alt="Third stepper" className={style.stepper} />

          <div className={style.spanForm}>
            <div className={style.doubleInput}>
              <div>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="nickname"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Apelido do endereço"
                      control={control}
                      type="input"
                      value={value}
                      onChange={onChange}
                      className={style.inputNickname}
                    >
                      <MdIcons.MdHome />
                    </Input>
                  )}
                />
                <ErrorMessage> {errors.nickname?.message}</ErrorMessage>
              </div>

              <div className={style.inputZipCode}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="zipCode"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="CEP"
                      control={control}
                      type="input"
                      value={value}
                      onChange={(e) => onChange(removeLetters(e.target.value))}
                      className={style.inputMargin}
                    >
                      <MdIcons.MdHome />
                    </Input>
                  )}
                />
                <ErrorMessage> {errors.zipCode?.message}</ErrorMessage>
              </div>
            </div>

            <Controller
              control={control}
              rules={{ required: true }}
              name="street"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Rua"
                  control={control}
                  type="input"
                  value={value}
                  onChange={onChange}
                >
                  <MdIcons.MdHome />
                </Input>
              )}
            />
            <ErrorMessage> {errors.street?.message}</ErrorMessage>

            <Controller
              control={control}
              rules={{ required: true }}
              name="city"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Cidade"
                  control={control}
                  type="input"
                  value={value}
                  onChange={onChange}
                >
                  <MdIcons.MdHome />
                </Input>
              )}
            />

            <ErrorMessage> {errors.city?.message}</ErrorMessage>
            <Controller
              control={control}
              rules={{ required: true }}
              name="neighborhood"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Bairro"
                  control={control}
                  type="input"
                  value={value}
                  onChange={onChange}
                >
                  <MdIcons.MdHome />
                </Input>
              )}
            />
            <ErrorMessage> {errors.neighborhood?.message}</ErrorMessage>
            <div className={style.doubleInput}>
              <div>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="state"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Estado"
                      control={control}
                      type="input"
                      value={value}
                      onChange={onChange}
                      className={style.inputState}
                    >
                      <MdIcons.MdHome />
                    </Input>
                  )}
                />
                <ErrorMessage> {errors.state?.message}</ErrorMessage>
              </div>

              <div className={style.inputNumber}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="number"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Número"
                      control={control}
                      type="input"
                      value={value}
                      onChange={(e) => onChange(removeLetters(e.target.value))}
                      className={style.inputMargin}
                    >
                      <MdIcons.MdHome />
                    </Input>
                  )}
                />
                <ErrorMessage> {errors.number?.message}</ErrorMessage>
              </div>
            </div>
            <Button variant="red" type="submit" className={style.buttonSignUp}>
              Continuar
            </Button>
          </div>
        </form>
      </div>
      {signUpSucceeded ? <Loader /> : " "}
    </>
  );
}
