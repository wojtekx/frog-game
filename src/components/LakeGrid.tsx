import React, { Dispatch, SetStateAction, useState } from "react";
import Frog from "./Frog";
import { IFrog } from "./Frog.d";

const gridWidth = 10;
const gridHeight = 6;

type ISelectedPosition = {
  y: number;
  x: number;
};

const LakeGrid = ({
  frogs,
  setFrogs,
}: {
  frogs: IFrog[];
  setFrogs: Dispatch<SetStateAction<IFrog[]>>;
}) => {
  const [previousSelectedFrog, setPreviousSelectedFrog] = useState<IFrog>(
    {} as IFrog
  );
  const [selectedFrog, setSelectedFrog] = useState<IFrog>({} as IFrog);
  const [selectedPosition, setSelectedPosition] = useState<ISelectedPosition>();

  const handleSelectFrog = (frog: IFrog) => {
    setSelectedPosition(undefined);

    if (frog.id === previousSelectedFrog.id) {
      setPreviousSelectedFrog({} as IFrog);
    }
    setSelectedFrog(frog);
  };

  const jumpPosibility = (targetY: number, targetX: number) => {
    if (selectedFrog) {
      const dy = Math.abs(targetY - selectedFrog.y);
      const dx = Math.abs(targetX - selectedFrog.x);
      const maxJump = selectedFrog.gender === "male" ? 3 : 2;

      if (
        (dy <= maxJump && dx === 0) ||
        (dx <= maxJump && dy === 0) ||
        (dy === dx && dy <= maxJump)
      ) {
        setSelectedPosition({ y: targetY, x: targetX });
      } else {
        alert("Jump out of range!");
      }
    }
  };

  const handleJump = () => {
    if (selectedPosition) {
      const updatedFrogs = frogs.map((f) =>
        f.id === selectedFrog.id
          ? { ...f, y: selectedPosition.y, x: selectedPosition.x }
          : f
      );
      setFrogs(updatedFrogs);

      setPreviousSelectedFrog({} as IFrog);
      handleSelectFrog({} as IFrog);
      setSelectedPosition(undefined);
    }
  };

  const checkAvailablePlaceForNewFrog = (y: number, x: number) => {
    const positionsAround = [
      { y: y - 1, x: x - 1 },
      { y: y - 1, x },
      { y: y - 1, x: x + 1 },
      { y, x: x - 1 },
      { y, x: x + 1 },
      { y: y + 1, x: x - 1 },
      { y: y + 1, x },
      { y: y + 1, x: x + 1 },
    ].filter(({ y, x }) => y >= 0 && y < gridHeight && x >= 0 && x < gridWidth);

    return (
      positionsAround.find(
        (position) =>
          !frogs.some((frog) => frog.y === position.y && frog.x === position.x)
      ) || null
    );
  };

  const isPartnerNextToMe = () => {
    const dx = Math.abs(selectedFrog?.x - previousSelectedFrog?.x);
    const dy = Math.abs(selectedFrog?.y - previousSelectedFrog?.y);

    return dx <= 1 && dy <= 1;
  };

  const handleReproduce = () => {
    if (!isPartnerNextToMe()) {
      alert("The frogs are too far gone to reproduce");
      return;
    }
    const femaleFrog =
      selectedFrog.gender === "female" ? selectedFrog : previousSelectedFrog;

    if (
      selectedFrog &&
      previousSelectedFrog &&
      selectedFrog.gender !== previousSelectedFrog.gender
    ) {
      const newTraits = [
        selectedFrog.traits[0],
        previousSelectedFrog.traits[1],
      ];
      const newPosition = checkAvailablePlaceForNewFrog(
        femaleFrog.y,
        femaleFrog.x
      );

      if (newPosition) {
        const newFrog = {
          id: frogs.length + 1,
          y: newPosition.y,
          x: newPosition.x,
          gender: Math.random() > 0.5 ? "male" : "female",
          traits: newTraits,
        };
        setFrogs([...frogs, newFrog]);
      } else {
        alert("No available places next to the mother!");
      }
      handleSelectFrog({} as IFrog);
      setPreviousSelectedFrog({} as IFrog);
    } else {
      alert("Invalid partner for reproduction!");
    }
  };

  return (
    <div className="game-field">
      <div className="lake-grid">
        {Array.from({ length: gridWidth }).map((_, x) => (
          <div
            key={x}
            className="row"
            style={
              selectedPosition?.x === x ? { backgroundColor: "yellow" } : {}
            }
          >
            {Array.from({ length: gridHeight }).map((_, y) => {
              const frog = frogs.find((f) => f.y === y && f.x === x);
              return (
                <div
                  key={y}
                  style={
                    selectedPosition?.y === y && selectedPosition?.x === x
                      ? { backgroundColor: "yellow" }
                      : {}
                  }
                  className="cell"
                  onClick={() => {
                    if (frog) {
                      selectedFrog.id &&
                        selectedFrog?.id !== frog.id &&
                        setPreviousSelectedFrog(selectedFrog);
                      handleSelectFrog(frog);
                    } else if (selectedFrog?.id) {
                      jumpPosibility(y, x);
                    }
                  }}
                >
                  {frog && (
                    <Frog
                      frog={frog}
                      selectedFrog={selectedFrog}
                      previousSelectedFrog={previousSelectedFrog}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="actions">
        <p style={{ marginTop: 0 }}>
          <strong> selectedFrog: </strong>
          <br></br>
          gender:
          {selectedFrog?.gender}
        </p>
        <p>
          <strong>previousSelectedFrog: </strong>
          <br></br>
          gender:
          {previousSelectedFrog?.gender}
        </p>
        <h4>Actions:</h4>
        <button
          onClick={handleJump}
          disabled={!selectedPosition}
          style={
            !selectedPosition
              ? { backgroundColor: "gray" }
              : { cursor: "pointer" }
          }
        >
          Jump
        </button>
        <button
          onClick={handleReproduce}
          disabled={
            !selectedFrog?.id ||
            !previousSelectedFrog?.id ||
            selectedFrog?.gender === previousSelectedFrog?.gender
          }
          style={
            !selectedFrog?.id ||
            !previousSelectedFrog?.id ||
            selectedFrog?.gender === previousSelectedFrog?.gender
              ? { backgroundColor: "gray" }
              : { cursor: "pointer" }
          }
        >
          Reproduce
        </button>

        <div>
          <h4>Legend:</h4>
          <ul className="legend-items">
            <li className="legend-item">
              <strong>Frog male</strong>
              <div className="frog male">
                <div
                  className="indicator"
                  style={{ backgroundColor: "blue" }}
                ></div>
              </div>
            </li>
            <li className="legend-item">
              <strong>Frog female</strong>
              <div className="frog female">
                <div
                  className="indicator"
                  style={{ backgroundColor: "purple" }}
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LakeGrid;
