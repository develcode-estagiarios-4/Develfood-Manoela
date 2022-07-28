import { IStarProps } from "../../interface/IStarRating";

const defaultProps = {
  colorEmptyStar: "white",
  strokeWidth: 20,
};

export function StarRating({
  grade,
  fontSize,
  colorEmptyStar,
  strokeWidth,
}: IStarProps & typeof defaultProps) {
  const starGradind = (grade: number) => {
    const gradePercentages: Array<number> = [];
    const parcialPainted = (grade % 1) * 10;
    const fullPainted = grade - parcialPainted / 10;
    Array.from({ length: fullPainted }).map(
      // eslint-disable-next-line no-return-assign
      (_, index: number) => (gradePercentages[index] = 100)
    );
    if (parcialPainted !== 0) {
      gradePercentages.push(parcialPainted * 10);
    }
    console.log(grade, gradePercentages);
    if (gradePercentages.length < 5) {
      const isMissing = 5 - gradePercentages.length;
      Array.from({ length: isMissing }).map((_, index) =>
        gradePercentages.push(0)
      );
    }
    return gradePercentages;
  };

  return (
    <div>
      {starGradind(grade).map((grade) => (
        <span>
          <svg
            style={{
              width: "0",
              height: "0",
            }}
          >
            <linearGradient
              id={`gradient${grade}`}
              x1={`${grade - 5}%`}
              x2={`${grade + 10}%`}
            >
              <stop offset="0" stopColor="#DFCC1B" />
              <stop offset="1" stopColor={colorEmptyStar} />
            </linearGradient>
          </svg>
          <svg
            version="1.0"
            height={`${fontSize}rem`}
            width={`${fontSize}rem`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2175.000000 2050.000000"
            strokeWidth={`${strokeWidth}rem`}
            stroke="black"
            preserveAspectRatio="xMidYMid meet"
            fill={`url(#gradient${grade})`}
          >
            <g transform="translate(0.000000,2050.000000) scale(0.100000,-0.100000)">
              <path
                d="M10809 19543 c-36 -109 -566 -1745 -1179 -3635 l-1115 -3438 -3838
-2 -3837 -3 3100 -2254 c1705 -1240 3102 -2257 3104 -2260 1 -3 -528 -1639
-1176 -3635 -648 -1996 -1176 -3631 -1174 -3633 2 -3 1374 991 3048 2208 1673
1217 3063 2227 3089 2245 l45 33 3088 -2245 c1699 -1235 3090 -2243 3092
-2241 2 2 -526 1637 -1174 3633 -648 1996 -1177 3631 -1176 3634 1 3 1398
1020 3104 2260 l3101 2255 -3838 3 -3838 2 -1174 3623 c-646 1992 -1177 3628
-1181 3635 -4 7 -36 -76 -71 -185z"
              />
            </g>
          </svg>
        </span>
      ))}
    </div>
  );
}

StarRating.defaultProps = defaultProps;
