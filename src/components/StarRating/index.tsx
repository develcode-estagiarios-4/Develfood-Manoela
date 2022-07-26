import { IStarProps } from "../../interface/IStarRating";

export function StarRating({ grade, fontSize }: IStarProps) {
  const starGradind = (grade: number) => {
    const gradePortion: Array<number> = [];
    const parcialPainted = (grade % 1) * 10;
    const fullPainted = grade - parcialPainted / 10;
    Array.from({ length: fullPainted }).map(
      // eslint-disable-next-line no-return-assign
      (_, index: number) => (gradePortion[index] = 100)
    );
    gradePortion.push(parcialPainted * 10);
    if (gradePortion.length < 5) {
      const isMissing = 5 - gradePortion.length;
      Array.from({ length: isMissing }).map((_, index) => gradePortion.push(0));
    }
    return gradePortion;
  };

  return (
    <div>
      {" "}
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </div>
      {starGradind(grade).map((grade) => (
        <span>
          <i
            className="material-symbols-outlined"
            style={{
              fontSize: `${fontSize}rem`,
              background: `linear-gradient(to right, #DFCC1B ${
                grade - 10
              }%, white ${grade + 20}%`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            star
          </i>
        </span>
      ))}
    </div>
  );
}
