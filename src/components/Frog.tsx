import React from "react";
import { IFrog } from "./Frog.d";

const Frog = ({
  frog: { id, gender, traits },
  previousSelectedFrog,
  selectedFrog,
}: {
  frog: IFrog;
  previousSelectedFrog: IFrog;
  selectedFrog: IFrog;
}) => {
  const color = {
    male: "blue",
    female: "purple",
  }[gender];

  return (
    <div
      className={`frog ${
        selectedFrog?.id === id || previousSelectedFrog?.id === id
          ? "highlight"
          : ""
      }`}
    >
      {traits.join(", ")}
      <div className="indicator" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default React.memo(Frog);
