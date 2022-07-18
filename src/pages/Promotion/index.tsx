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
import { IPromotion } from "../../interface/IPromotion";
import style from "./style.module.scss";

function Box({ children }: PropsWithChildren<unknown>) {
  return <div className={style.boxSkeleton}>{children}</div>;
}

export function Promotions() {
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
        <div className={style.title}>Suas promoções</div>
        <div className={style.spanContent}>
          <Button
            variant="red"
            type="button"
            className={style.buttonPromotion}
            onClick={handleClick}
          >
            Nova Promoção
          </Button>
          {loading ? (
            <div className={style.contentPromotion}>
              <Skeleton wrapper={Box} count={4} />
            </div>
          ) : (
            <div
              className={
                promotions.length > 0
                  ? style.contentPromotion
                  : style.contentNoPromotion
              }
            >
              {promotions.length > 0 ? (
                promotions.map((promotion: IPromotion) => (
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
