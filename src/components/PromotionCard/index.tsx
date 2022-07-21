import { useEffect } from "react";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { usePromotion } from "../../hooks/usePromotion";
import { IPromotion } from "../../interface/IPromotion";
import style from "./style.module.scss";

const defautProps = {
  classNameImage: "",
  classNameSpanDefaul: "",
  classNameInable: "",
};

interface IPromotionProps {
  data: IPromotion;
  onDelete: () => void;
  classNameImage?: string;
  classNameSpanDefaul?: string;
  classNameInable?: string;
}

export function PromotionCard({
  data,
  onDelete,
  classNameImage,
  classNameSpanDefaul,
  classNameInable,
}: IPromotionProps & typeof defautProps) {
  const navigate = useNavigate();

  const { deletePromotion, getPromotionBanner, promotionBanner } =
    usePromotion();

  const handleDelete = async () => {
    await deletePromotion(data.id);
    onDelete();
  };

  const handleEdit = () => {
    navigate(`/promotion/edit/${data.id}`);
  };

  useEffect(() => {
    getPromotionBanner(data.photo_url.slice(40));
  }, [promotionBanner]);

  return (
    <div className={style.divhover}>
      <div className={`${style.promotion} ${classNameSpanDefaul}`}>
        <div className={style.divS}>
          {promotionBanner ? (
            <img
              src={promotionBanner}
              alt="Promotion Banner"
              className={`${style.imagePromotion} ${classNameImage}`}
            />
          ) : (
            ""
          )}
          <div className={`${style.promotionTitle}  ${classNameInable}`}>
            {data.name}
          </div>
          <div className={`${style.spanButtons} ${classNameInable}`}>
            <button
              className={`${style.spanDelete} ${classNameInable}`}
              onClick={handleDelete}
              type="button"
            >
              <MdIcons.MdDelete
                className={`${style.IconDelete} ${classNameInable}`}
              />
            </button>
            <button
              className={`${style.spanEdit} ${classNameInable}`}
              onClick={handleEdit}
              type="button"
            >
              <RiIcons.RiPencilFill
                className={`${style.IconEdit} ${classNameInable}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

PromotionCard.defaultProps = defautProps;
