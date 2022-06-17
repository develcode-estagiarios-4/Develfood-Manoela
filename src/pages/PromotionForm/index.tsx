import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import img from "../../assets/img/previewPromotion.png";
import {
  AlertMessage,
  Button,
  Container,
  ErrorMessage,
  Input,
} from "../../components";
import { usePromotion } from "../../hooks/usePromotion";
import { useRestaurant } from "../../hooks/useRestaurant";
import { INewPromotion } from "../../interface/INewPromotion";
import { removeLetters } from "../../utils/textUtils";
import { newDate } from "../../utils/todayDate";
import style from "./style.module.scss";

const schema = yup.object().shape({
  name: yup.string().required("O campo Nome é obrigatório"),
  percent: yup.string().required("O campo Porcentagem é obrigatório"),
  dateFinal: yup
    .date()
    .nullable()

    .required("Insira um data final")
    .when("dateInitial", (dateInitial, schema) => {
      if (dateInitial) {
        const from = dateInitial;
        return schema.min(from, "Insira uma data válida");
      }

      return schema;
    })
    .typeError("Insira uma data válida"),
  dateInitial: yup.string().required("Insira um data incial"),
});

export function PromotionForm() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [imageBanner, setImageBanner] = useState(img);
  const { restaurant, getRestaurant } = useRestaurant();
  const {
    getPromotion,
    promotion,
    getPromotionBanner,
    promotionBanner,
    putSuccessed,
    putError,
  } = usePromotion();

  const { postPromotion, postSuccessed, postError, updatePromotion } =
    usePromotion();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onLoad = (fileString: any) => {
    setImageBanner(fileString);
  };

  const getBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const today = newDate();

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const file = e.target.files[0];
      getBase64(file);
    }
  };

  const handleClickVoltar = () => {
    navigate("/promotion");
  };

  const body: INewPromotion = {
    name: "",
    percent: "",
    photo: {
      code: "",
    },
    dateInitial: "",
    dateFinal: "",
    restaurant: { id: 0 },
  };

  const onSubmit = () => {
    const values = getValues();
    body.dateInitial = `${values.dateInitial} ${"00:00:00"}`;
    body.name = values.name;
    body.percent = values.percent;
    body.dateFinal = `${values.dateFinal} ${"23:59:59"}`;
    body.photo.code = imageBanner;
    console.log(body);
    if (restaurant?.id !== undefined) {
      body.restaurant.id = restaurant.id;
    }
    if (id) {
      updatePromotion(id, body);
    } else {
      postPromotion(body);
    }
  };

  function dateFormat(dateValue: string) {
    const dataFormated = dateValue.split(" ")[0];
    return dataFormated;
  }

  useEffect(() => {
    getPromotionBanner(promotion.photo_url.slice(40));
    setValue("name", promotion.name);
    setValue("percent", promotion.percent);
    setValue("dateFinal", dateFormat(promotion.dateFinal));
    setValue("dateInitial", dateFormat(promotion.dateInitial));
  }, [promotion]);

  useEffect(() => {
    if (promotionBanner !== null) {
      setImageBanner(promotionBanner);
    }
  }, [promotionBanner]);

  useEffect(() => {
    getRestaurant();
    if (id) {
      const promotionId = parseInt(id, 10);
      getPromotion(promotionId);
    }
  }, []);

  useEffect(() => {
    if (restaurant?.id !== undefined) {
      body.restaurant.id = restaurant.id;
    }
  }, [restaurant]);

  useEffect(() => {
    console.log(postSuccessed);
  }, [postSuccessed]);

  return (
    <Container>
      {postSuccessed ? (
        <AlertMessage variant="green">
          Promoção editada com sucesso
        </AlertMessage>
      ) : (
        ""
      )}
      {postSuccessed && (
        <AlertMessage variant="green">Promoção cadastrada</AlertMessage>
      )}
      {postError && (
        <AlertMessage variant="red">Erro ao cadastrar</AlertMessage>
      )}
      {putSuccessed && (
        <AlertMessage variant="green">
          Promoção editada com sucesso
        </AlertMessage>
      )}
      {putError && <AlertMessage variant="red">Erro ao editar</AlertMessage>}
      <div className={style.pageContent}>
        <div className={style.tittle}>Cadastro de promoção</div>
        <div className={style.spanContent}>
          <form className={style.leftSpam} onSubmit={handleSubmit(onSubmit)}>
            <Button
              variant="green"
              type="button"
              className={style.buttonPromotion}
              onClick={handleClickVoltar}
            >
              Voltar
            </Button>
            <div className={style.spanForm}>
              <div className={style.inputNome}>
                <Controller
                  control={control}
                  defaultValue={useMemo(() => {
                    return promotion.name;
                  }, [promotion])}
                  rules={{ required: true }}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Nome"
                      type="input"
                      value={value}
                      onChange={onChange}
                      control={control}
                      className={style.nameInput}
                    />
                  )}
                />
                <ErrorMessage> {errors.name?.message}</ErrorMessage>
              </div>

              <div className={style.spanInput}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="percent"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Porcentagem"
                      type="input"
                      value={value}
                      onChange={(e) => onChange(removeLetters(e.target.value))}
                      control={control}
                      className={style.porcentInput}
                    />
                  )}
                />
                <ErrorMessage> {errors.percent?.message}</ErrorMessage>
              </div>

              <div className={style.inputDate}>
                <div>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="dateInitial"
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="date"
                        placeholder="Data Inicial"
                        value={value}
                        onChange={onChange}
                        min={today}
                        className={style.dataInput}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.dateInitial?.message}</ErrorMessage>
                </div>
                <div>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="dateFinal"
                    render={({ field: { onChange, value } }) => (
                      <input
                        placeholder="Data Final"
                        type="date"
                        min={value}
                        value={value}
                        onChange={onChange}
                        className={style.dataInput}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.dateFinal?.message}</ErrorMessage>
                </div>
              </div>
            </div>

            <Button
              variant="red"
              type="submit"
              className={style.buttonPromotion}
            >
              Salvar
            </Button>
          </form>

          <div className={style.spanRight}>
            <img
              src={imageBanner}
              className={style.image}
              alt="Promotion Banner"
            />
            <span className={style.uploadSpan}>
              <input
                className={style.inputUpload}
                onChange={onChangeImage}
                name="images"
                multiple={false}
                type="file"
                accept=".jpef, .png, .jpg"
              />
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}
