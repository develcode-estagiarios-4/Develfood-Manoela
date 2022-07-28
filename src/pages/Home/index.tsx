import { useEffect, useState } from "react";
import * as RiIcons from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

import {
  PromotionCard,
  Container,
  EvaluationCard,
  StarRating,
} from "../../components";
import { useEvaluation } from "../../hooks/useEvaluation";
import { usePromotion } from "../../hooks/usePromotion";
import { useRestaurant } from "../../hooks/useRestaurant";
import { IEvaluation } from "../../interface/IEvaluation";
import { IPromotion } from "../../interface/IPromotion";
import style from "./style.module.scss";

export function Home() {
  const { restaurant, getRestaurant } = useRestaurant();
  const { getPromotions, promotions, pageableData } = usePromotion();
  const [promotionPage, setPromotionPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isImagePromotionLoaded, setIsImagePromotionLoaded] = useState(false);
  const [direction, setDirection] = useState(true);
  const [promotionsUpdate, setPromotionsUpdate] = useState<IPromotion[]>();

  const {
    grade,
    getGrade,
    getEvaluation,
    evaluation,
    currentPage,
    totalPagesEvaluation,
  } = useEvaluation();

  useEffect(() => {
    getPromotions(promotionPage, 2);
    getEvaluation(0, 3);
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

  const isFirstPage = promotionPage === 0;
  const isLastPage = pageableData.page === pageableData.totalPages;
  const onlyOnePage = pageableData.totalPages === 0;
  const onlyOnePromotion = promotions.length === 1;

  useEffect(() => {
    if (promotions.length > 0) {
      setPromotionsUpdate(promotions);
    }
  }, [promotions]);

  const handleArrowRight = () => {
    setDirection(true);
    setIsImagePromotionLoaded(false);
    setPromotionPage(promotionPage + 1);
    getPromotions(promotionPage + 1, 2);
  };

  const handleArrowLeft = () => {
    setDirection(false);
    setIsImagePromotionLoaded(false);
    setPromotionPage(promotionPage - 1);
    getPromotions(promotionPage - 1, 2);
  };

  const handleChangePageEvaluation = (index: number) => {
    if (index !== currentPage) {
      getEvaluation(index, 3);
    }
  };

  const loadImage = () => {
    setIsImagePromotionLoaded(true);
  };

  return (
    <Container setIsNavbarInvisible="true">
      <div className={style.homePage}>
        {loading ? (
          <div className={`${style.contentSkeleton} ${style.tittleSkeleton}`}>
            <Skeleton
              count={1}
              style={{
                width: "70rem",
                height: "9rem",
              }}
            />
          </div>
        ) : (
          <div className={style.home}> {restaurant?.name} </div>
        )}

        <div className={style.homeSpan}>
          <div className={style.leftSpan}>
            {loading ? (
              <div className={style.contentSkeleton}>
                <Skeleton count={2} className={style.skeletonStar} />
              </div>
            ) : (
              <>
                <div className={style.gradeSpan}>
                  Sua nota{" "}
                  <StarRating
                    grade={grade}
                    fontSize={12}
                    colorEmptyStar="white"
                  />
                  <div className={style.grade}>{`${grade}/5.0`}</div>
                </div>
                <div className={style.spanPromotionsBanners}>
                  <div className={style.promotionsActiveTittle}>
                    Suas promoções ativas
                  </div>
                  {!isImagePromotionLoaded && (
                    <div
                      className={`${style.skeletonSpanPromotion} ${
                        onlyOnePromotion && style.lasPage
                      }`}
                    >
                      <Skeleton
                        className={`${
                          direction ? style.skeletonRight : style.skeletonLeft
                        } ${style.skeleton}`}
                        count={1}
                        style={{
                          width: "30rem",
                          height: "20rem",
                          zIndex: 1,
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
                          zIndex: 1,
                        }}
                      />
                    </div>
                  )}
                  <div className={style.scrollPromotions}>
                    {!isFirstPage && !onlyOnePage && (
                      <RiIcons.RiArrowLeftSLine
                        className={`${style.arrow} ${style.arrowLeft}`}
                        onClick={handleArrowLeft}
                      />
                    )}
                    {!isLastPage && !onlyOnePage && (
                      <RiIcons.RiArrowRightSLine
                        className={`${style.arrow} ${style.arrowRight}`}
                        onClick={handleArrowRight}
                      />
                    )}
                    {promotionsUpdate &&
                      promotionsUpdate.map((promotion: IPromotion, index) => (
                        <div
                          className={style.promotionBanner}
                          key={promotion.id}
                        >
                          <PromotionCard
                            data={promotion}
                            classNameImage={style.promotionImage}
                            classNameInable={style.itensInable}
                            classNameSpanDefaul={style.promotionDefault}
                            isImageLoaded={loadImage}
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
                      ))}{" "}
                  </div>
                </div>{" "}
              </>
            )}
          </div>
          <div className={style.rightSpan}>
            {loading ? (
              <div className={style.contentSkeleton}>
                <Skeleton
                  count={1}
                  style={{
                    width: "70rem",
                    rowGap: "15rem",
                    height: "70rem",
                  }}
                />
              </div>
            ) : (
              <>
                <div className={style.coments}>
                  <div className={style.commentsTittle}>
                    O que os cliente estão <br /> achando?
                  </div>
                  <div className={style.spanComments}>
                    {evaluation &&
                      evaluation.map((data: IEvaluation) => {
                        return <EvaluationCard data={data} key={data.id} />;
                      })}
                  </div>

                  <div className={style.spanCircles}>
                    <div>
                      {Array.from({ length: totalPagesEvaluation }).map(
                        (_, index: number) => (
                          <button
                            className={`${
                              index === currentPage
                                ? style.currentPage
                                : style.iconPage
                            } ${style.icon}`}
                            type="button"
                            onClick={() => handleChangePageEvaluation(index)}
                          >
                            icon{" "}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
