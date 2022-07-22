import { useEffect, useState } from "react";
import * as RiIcons from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";

import { PromotionCard } from "../../components";
import { CommentCard, IComment } from "../../components/CommentCard";
import { Container } from "../../components/Container";
import { StarRating } from "../../components/StarRating";
import { useEvaluation } from "../../hooks/useEvaluation";
import { usePromotion } from "../../hooks/usePromotion";
import { useRestaurant } from "../../hooks/useRestaurant";
import { IPromotion } from "../../interface/IPromotion";
import style from "./style.module.scss";

export function Home() {
  const navigate = useNavigate();
  const { restaurant, getRestaurant } = useRestaurant();
  const { getPromotions, promotions } = usePromotion();
  const [pagination, setPagination] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadMorePromotions, setLoadMorePromotions] = useState(true);
  const [promotionsUpdate, setPromotionsUpdate] = useState<IPromotion[]>();
  const { grade, getGrade } = useEvaluation();

  useEffect(() => {
    getPromotions(pagination, 2);
    getRestaurant();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (restaurant) {
      getGrade(restaurant.id);
    }
  }, [restaurant]);

  function handleClick() {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.getItem("token");
    navigate("/");
  }

  const comments: IComment[] = [
    {
      message:
        "“A comida desse lugar é sensacional. Eu e minha esposa comemos quase todo o domingo!!!”",
      grade: 4,
      date: "01/02/2022",
    },
    {
      message:
        "“A comida é excelente, mas muitas vezes demora para ficar preparada.“",
      date: "01/02/2022",
      grade: 3,
    },
    {
      message: "“O sinônimo de comida boa é DevelcodeRestaurant.“",
      date: "01/02/2022",
      grade: 1,
    },
    {
      message: "“A melhor pizza da cidade! Voltarei mais vezes.“",
      date: "01/02/2022",
      grade: 2,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoadMorePromotions(false);
    }, 4000);
    if (promotions.length > 0) {
      setPromotionsUpdate(promotions);
    } else {
      getPromotions(0, 2);
      setPagination(0);
      setPromotionsUpdate(promotions);
    }
  }, [promotions]);

  const handleArrowRight = () => {
    setPagination(pagination + 1);
    getPromotions(pagination + 1, 2);
    setLoadMorePromotions(true);
    setTimeout(() => {
      setLoadMorePromotions(false);
    }, 2000);
  };

  const handleArrowLeft = () => {
    setPagination(pagination - 1);
    getPromotions(pagination - 1, 2);
    setLoadMorePromotions(true);
    setTimeout(() => {
      setLoadMorePromotions(false);
    }, 5000);
  };

  const handlePathPromotion = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const isBegging = pagination === 0;

  return (
    <Container active="true">
      {loading ? (
        <div className={style.contentSkeleton}>
          <Skeleton
            count={3}
            style={{ width: "50rem", height: "30rem" }}
            duration={12000}
          />
        </div>
      ) : (
        <>
          <button type="button" onClick={handleClick}>
            log out
          </button>
          <div className={style.homePage}>
            <div className={style.home}> {restaurant?.name} </div>
            <div className={style.homeSpan}>
              <div className={style.leftSpan}>
                <div className={style.gradeSpan}>
                  Sua nota <StarRating grade={grade} fontSize={11} />
                  <div className={style.grade}>{`${grade}/5.0`}</div>
                </div>

                <div className={style.spanPromotionsBanners}>
                  <div className={style.promotionsActiveTitle}>
                    Suas promoções ativas
                  </div>
                  <div className={style.scrollPromotions}>
                    {loadMorePromotions ? (
                      <div className={style.skeletonSpanPromotion}>
                        <Skeleton
                          count={1}
                          style={{
                            width: "30rem",
                            height: "20rem",
                            zIndex: -2,
                          }}
                        />
                        <Skeleton
                          count={1}
                          style={{
                            width: "30rem",
                            height: "20rem",
                            zIndex: -2,
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <RiIcons.RiArrowRightSLine
                          className={`${style.arrow} ${style.arrowRight}`}
                          onClick={handleArrowRight}
                        />
                        {!isBegging && (
                          <RiIcons.RiArrowLeftSLine
                            className={`${style.arrow} ${style.arrowLeft}`}
                            onClick={handleArrowLeft}
                          />
                        )}
                        {promotionsUpdate &&
                          promotionsUpdate.map(
                            (promotion: IPromotion, index) => (
                              <div
                                className={style.promotionBanner}
                                key={promotion.id}
                              >
                                <PromotionCard
                                  data={promotion}
                                  classNameImage={style.promotionImage}
                                  classNameInable={style.itensInable}
                                  classNameSpanDefaul={style.promotionDefault}
                                />
                                <Link
                                  to={`/promotion/edit/${promotion.id}`}
                                  className={`${style.link} ${
                                    index === 1
                                      ? style.promotionRight
                                      : style.promotionLeft
                                  }`}
                                />
                              </div>
                            )
                          )}{" "}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={style.rightSpan}>
                <div className={style.coments}>
                  <div className={style.commentsTittle}>
                    O que os cliente estão <br /> achando?
                  </div>
                  <div className={style.spanComments}>
                    {comments.map((comment: IComment) => {
                      return <CommentCard data={comment} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
