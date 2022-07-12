import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdNoStroller } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";

import arrow from "../../assets/img/arrow.png";
import img from "../../assets/img/previewPromotion.png";
import {
  Container,
  AlertMessage,
  Button,
  ErrorMessage,
  Input,
  TextArea,
} from "../../components";
import { styleOptions } from "../../components/styleOptions";
import { usePlate } from "../../hooks/usePlate";
import { useRestaurant } from "../../hooks/useRestaurant";
import { IFoodType } from "../../interface/IFoodType";
import { INewPlate } from "../../interface/INewPlate";
import { currency, formatCurrency, formatPrice } from "../../utils/textUtils";
import style from "./style.module.scss";

const schema = yup.object().shape({
  name: yup.string().required("O campo Nome é obrigatório"),
  description: yup.string().required("O campo Descrição é obrigatório"),
  price: yup.string().required("O campo Preço é obrigatório"),
});

export function PlateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { restaurant, getRestaurant } = useRestaurant();
  const [errorFoodType, setErrorFoodType] = useState(false);
  const [selectFoodType, setSelectFoodType] = useState([]);
  const [imageBanner, setImageBanner] = useState("");
  const [foodType, setFoodType] = useState<IFoodType>();
  const [data, setData] = useState();

  const {
    updatePlate,
    plateBanner,
    postPlate,
    plate,
    getPlate,
    getPlateBanner,
    putPlateSuccessed,
    postPlateSuccessed,
    postPlateError,
  } = usePlate();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const file = e.target.files[0];
      getBase64(file);
    }
  };

  useEffect(() => {
    getRestaurant();
    if (id) {
      const plateId = parseInt(id, 10);
      getPlate(plateId);
    }
  }, []);

  useEffect(() => {
    if (plateBanner) {
      setImageBanner(plateBanner);
    }
  }, [plateBanner]);

  useEffect(() => {
    getPlateBanner(plate.photo_url.slice(40));
    setValue("name", plate.name);
    setValue("description", plate.description);
    setValue("price", formatCurrency(parseFloat(plate.price)));
    setFoodType({
      value: parseInt(plate.foodType.id, 10),
      label: plate.foodType.name,
    });
  }, [plate]);

  function validateSelect() {
    if (foodType?.label.length === 0) {
      setErrorFoodType(true);
    } else {
      setErrorFoodType(false);
    }
  }

  const handleClickVoltar = () => {
    navigate("/menu");
  };

  const body: INewPlate = {
    name: "",
    description: "",
    price: 0,
    foodType: { id: 0 },
    restaurant: { id: 0 },
    photo: { code: "string" },
  };

  const onSubmit = () => {
    const values = getValues();
    body.description = values.description;
    body.name = values.name;
    body.price = parseFloat(formatPrice(values.price));
    if (foodType) body.foodType.id = foodType.value;
    validateSelect();
    if (restaurant?.restaurant.id !== undefined) {
      body.restaurant.id = restaurant.restaurant.id;
    }
    body.photo.code = imageBanner;
    if (id) {
      updatePlate(id, body);
    } else if (foodType?.label.length !== 0) {
      postPlate([body]);
    }
  };

  const onClick = () => {
    validateSelect();
  };

  const onChangeSelect = (value: any) => {
    setFoodType(value[0]);
    setData(value);
    setSelectFoodType(value);
  };

  const options = [
    { value: 1, label: "FASTFOOD" },
    { value: 2, label: "PIZZA" },
    { value: 3, label: "ITALIANA" },
    { value: 4, label: "DOCE" },
  ];

  return (
    <Container>
      {postPlateSuccessed && (
        <AlertMessage variant="green">Prato cadastrado</AlertMessage>
      )}
      {postPlateError && (
        <AlertMessage variant="green">Erro ao cadastrar</AlertMessage>
      )}
      {putPlateSuccessed && (
        <AlertMessage variant="green">Prato editado com sucesso</AlertMessage>
      )}
      <div className={style.pageContent}>
        <div className={style.tittle}>
          Cadastro de novo <br /> prato
        </div>
        <div className={style.spanContent}>
          <form className={style.leftSpam} onSubmit={handleSubmit(onSubmit)}>
            <Button
              variant="green"
              type="button"
              className={style.buttonPlate}
              onClick={handleClickVoltar}
            >
              Voltar
            </Button>
            <div className={style.spanForm}>
              <div className={style.inputNome}>
                <Controller
                  control={control}
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
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <TextArea
                      placeholder="Descrição"
                      value={value}
                      onChange={onChange}
                      control={control}
                    />
                  )}
                />

                <ErrorMessage> {errors.description?.message}</ErrorMessage>
              </div>

              <div className={style.spanBottom}>
                <div>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="price"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder="Preço"
                        type="input"
                        value={value}
                        onChange={(e) => onChange(currency(e))}
                        control={control}
                        className={style.dataInput}
                      />
                    )}
                  />
                </div>
                <div>
                  <div className={style.spanSelect}>
                    <img src={arrow} alt="arrow" className={style.arrow} />

                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="foodType"
                      render={({ field: { value } }) => (
                        <Select
                          placeholder="Tipos de comida"
                          isOptionDisabled={() => selectFoodType.length === 1}
                          isMulti
                          isSearchable={false}
                          closeMenuOnSelect={false}
                          classNamePrefix="react-select"
                          onChange={onChangeSelect}
                          value={id ? foodType : data}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: "8E8E8E",
                              neutral80: "8E8E8E",
                              neutral20: "white",
                              neutral30: "8E8E8E",
                              neutral50: "8E8E8E",
                              neutral60: "8E8E8E",
                              neutral70: "8E8E8E",
                              neutral90: "8E8E8E",
                            },
                          })}
                          styles={styleOptions}
                          options={options}
                          className={style.select}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className={style.spanError}>
                <div className={style.spanPrice}>
                  <ErrorMessage> {errors.price?.message}</ErrorMessage>
                </div>
                <div className={style.spanFoodType}>
                  {errorFoodType && (
                    <ErrorMessage> Escolha um tipo de comida </ErrorMessage>
                  )}
                </div>
              </div>
            </div>

            <Button
              variant="red"
              type="submit"
              className={style.buttonPlate}
              onClick={onClick}
            >
              Salvar
            </Button>
          </form>

          <div className={style.spanRight}>
            <img
              src={imageBanner || img}
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
