import { PropsWithChildren, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

import { Button, Container, NoPlate } from "../../components";
import { DeleteMessage } from "../../components/DeleteMessage";
import { PlateCard } from "../../components/PlateCard";
import { usePlate } from "../../hooks/usePlate";
import { useRestaurant } from "../../hooks/useRestaurant";
import { IPlate } from "../../interface/IPlate";
import style from "./style.module.scss";

function Box({ children }: PropsWithChildren<unknown>) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        display: "inline-block",
        lineHeight: 36,
        padding: "1rem",
        marginBottom: "3rem",
        width: 210,
        justifyContent: "space-between",
        marginLeft: "3.5rem",
        columnGap: "4rem",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}

export function Menu() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [id, setId] = useState(0);

  const { restaurant, getRestaurant } = useRestaurant();
  const {
    getPlates,
    plates,
    searchPlate,
    filteredPlates,
    setPlates,
    deletePlate,
  } = usePlate();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getRestaurant();
  }, []);

  useEffect(() => {
    getPlates();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(filteredPlates);
    setPlates(filteredPlates);
  }, [filteredPlates]);

  function handleSearch(value: string) {
    if (value.length > 1) {
      setFilter(value);
    } else {
      setFilter("");
    }
  }

  useEffect(() => {
    console.log(filter);
    if (restaurant?.id !== undefined) {
      searchPlate(filter, restaurant?.id);
      getPlates();
    }
  }, [filter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const handleClick = () => {
    navigate("/plate/new");
  };

  const handleDeletePromotion = (id: number) => {
    setId(id);
    setDeleteAlert(true);
  };

  const handleCancelDelete = () => {
    setDeleteAlert(false);
  };

  const handleDeletePromotionee = () => {
    deletePlate(id);
    setDeleteAlert(false);
    setTimeout(() => getPlates(), 500);
  };

  return (
    <Container>
      <div className={style.spanPage}>
        <div className={style.menu}>
          Menu do restaurante: <br />
          {restaurant?.name}
        </div>{" "}
        <div className={style.spancontent}>
          {deleteAlert && (
            <div className={style.deleteMessage}>
              <DeleteMessage
                onDelete={handleDeletePromotionee}
                cancelDelete={handleCancelDelete}
              />
            </div>
          )}
          <input
            className={style.searchPlate}
            placeholder="Nome do Prato"
            onChange={handleChange}
          />
          <Button
            variant="red"
            type="button"
            className={style.buttonPromotion}
            onClick={handleClick}
          >
            Nova Prato
          </Button>

          {loading ? (
            <div className={style.contentNoPromotion}>
              <Skeleton wrapper={Box} count={6} />
            </div>
          ) : (
            <div
              className={
                plates.length > 0
                  ? style.contentNoPromotion
                  : style.contentPromotion
              }
            >
              {plates.length > 0 ? (
                plates.map((plate: IPlate) => (
                  <div key={plate.id}>
                    <PlateCard
                      data={plate}
                      onDelete={(id) => handleDeletePromotion(id)}
                    />
                  </div>
                ))
              ) : (
                <div className={style.spanNoPromotion}>
                  <NoPlate />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
