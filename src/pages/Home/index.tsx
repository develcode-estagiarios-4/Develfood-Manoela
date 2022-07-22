import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";

import { PromotionCard } from "../../components";
import { CommentCard } from "../../components/CommentCard";
import { Container } from "../../components/Container";
import { StarRating } from "../../components/StarRating";
import { useEvaluation } from "../../hooks/useEvaluation";
import { usePromotion } from "../../hooks/usePromotion";
import { useRestaurant } from "../../hooks/useRestaurant";
import { IComment } from "../../interface/IComment";
import { IPromotion } from "../../interface/IPromotion";
import style from "./style.module.scss";

export function Home() {
  const navigate = useNavigate();
  const { restaurant, getRestaurant } = useRestaurant();
  const { getPromotions, promotions } = usePromotion();
  const [pagination, setPagination] = useState(0);
  const [paginationComment, setPaginationCOmment] = useState(0);
  const [pagesHowmany, setPages] = useState<number[]>();

  const [loading, setLoading] = useState(true);
  const [loadMorePromotions, setLoadMorePromotions] = useState(true);
  const [isSingle, setIsSingle] = useState(false);
  const [direction, setDirection] = useState(true);
  const [promotionsUpdate, setPromotionsUpdate] = useState<IPromotion[]>();

  const { grade, getGrade, getEvaluation, evaluation, totalPagesEvaluation } =
    useEvaluation();

  useEffect(() => {
    getPromotions(pagination, 2);
    getEvaluation(paginationComment, 4);
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

  const pagesEvaluation: any = [];

  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < totalPagesEvaluation; i++) {
      console.log(i);
      pagesEvaluation.push(i);
    }
    console.log(pagesEvaluation);
    setPages(pagesEvaluation);
  }, [totalPagesEvaluation]);

  useEffect(() => {
    setTimeout(() => {
      setLoadMorePromotions(false);
    }, 4000);

    if (promotions.length > 0) {
      setIsSingle(false);

      setPromotionsUpdate(promotions);
      if (promotions.length === 1 && pagination === 0) {
        setIsSingle(true);
      }
      if (promotions.length === 1 && pagination !== 0) {
        setIsSingle(true);
      }
    } else {
      getPromotions(0, 2);
      setIsSingle(false);

      setPagination(0);
      setPromotionsUpdate(promotions);
    }
  }, [promotions]);

  const handleArrowRight = () => {
    setDirection(true);
    setPagination(pagination + 1);
    getPromotions(pagination + 1, 2);
    setLoadMorePromotions(true);
    setTimeout(() => {
      setLoadMorePromotions(false);
    }, 2000);
  };

  const handleArrowLeft = () => {
    setDirection(false);
    setPagination(pagination - 1);
    getPromotions(pagination - 1, 2);
    setLoadMorePromotions(true);
    setTimeout(() => {
      setLoadMorePromotions(false);
    }, 5000);
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
                          className={`${
                            direction ? style.skeletonRight : style.skeletonLeft
                          } ${style.skeleton}`}
                          count={1}
                          style={{
                            width: "30rem",
                            height: "20rem",
                            zIndex: -2,
                          }}
                        />
                        <Skeleton
                          count={1}
                          className={`${
                            direction ? style.skeletonRight : style.skeletonLeft
                          } ${style.skeleton}`}
                          style={{
                            width: "30rem",
                            height: "20rem",
                            zIndex: -2,
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        {!isSingle && (
                          <RiIcons.RiArrowRightSLine
                            className={`${style.arrow} ${style.arrowRight}`}
                            onClick={handleArrowRight}
                          />
                        )}
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
                    {evaluation &&
                      evaluation.map((data: IComment) => {
                        return <CommentCard data={data} />;
                      })}
                    <div className={style.spanCircles}>
                      {pagesHowmany &&
                        pagesHowmany.map((index: number) => (
                          <>
                            <FiIcons.FiCircle
                              className={`${style.pagebleEvaluation} ${
                                index === paginationComment && style.black
                              }`}
                            />
                            <FaIcons.FaCircle
                              className={`${style.pagebleEvaluation} ${
                                index === paginationComment && style.black
                              }`}
                            />

                            <div>
                              {index} {paginationComment}
                            </div>
                          </>
                        ))}
                    </div>
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
