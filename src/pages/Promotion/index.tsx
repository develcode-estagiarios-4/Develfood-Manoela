import { PropsWithChildren, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  NoPromotion,
  PromotionCard,
} from "../../components";
import { usePromotion } from "../../hooks/usePromotion";
import style from "./style.module.scss";

function Box({ children }: PropsWithChildren<unknown>) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        display: "inline-block",
        lineHeight: 31,
        padding: "1rem",
        marginBottom: "3rem",
        width: 365,
        justifyContent: "space-between",
        marginLeft: "4.7rem",
        columnGap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}

export function Promocoes() {
  const navigate = useNavigate();
  const { getPromotions, promotions } = usePromotion();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPromotions();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleDeletePromotion = () => {
    getPromotions();
  };

  const handleClick = () => {
    navigate("/promotion/new");
  };

  return (
    <Container>
      <div className={style.spanPage}>
        <div className={style.promocoes}>Suas promoções</div>
        <div className={style.spancontent}>
          <Button
            variant="red"
            type="button"
            className={style.buttonPromotion}
            onClick={handleClick}
          >
            Nova Promoção
          </Button>
          {loading ? (
            <div className={style.contentNoPromotion}>
              <Skeleton wrapper={Box} count={4} />
            </div>
          ) : (
            <div
              className={
                promotions.length > 0
                  ? style.contentNoPromotion
                  : style.contentPromotion
              }
            >
              {promotions.length > 0 ? (
                promotions.map((promotion: any) => (
                  <div key={promotion.id}>
                    <PromotionCard
                      data={promotion}
                      onDelete={handleDeletePromotion}
                    />
                  </div>
                ))
              ) : (
                <div className={style.spanNoPromotion}>
                  <NoPromotion />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
