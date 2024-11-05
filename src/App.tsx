import React, { useState } from "react";
import LakeGrid from "./components/LakeGrid";
import "./App.css";

const initialFrogs = [
  { id: 1, x: 0, y: 0, gender: "male", traits: ["tall", "slim"] },
  { id: 2, x: 3, y: 2, gender: "female", traits: ["short", "fat"] },
];

function App() {
  const [frogs, setFrogs] = useState(initialFrogs);

  return (
    <div className="app">
      Below is a lake with dimensions 10x6 fields. Frogs are marked as green
      rectangles. Frog with a small blue rectangle is a male; with a purple
      rectangle female.
      <p>
        <strong>Acceptance criteria:</strong>
      </p>
      <ul>
        <li>
          Each frog can jump on an empty field (select the frog, the empty field
          and click the jump button)
        </li>
        <li>A male frog can jump 3 fields (also diagonal)</li>
        <li>A female frog can jump 2 fields (also diagonal)</li>
        <li>
          Each frog should have two characteristics (array of two elements:
          tall, short, fat, slim)
        </li>
        <li>
          Two frogs different genders, adjacent can reproduce (select one frog a
          male, one female and click the reproduce button)
        </li>
        <li>
          The new frog should be placed in the first available space adjacent to
          the mother
        </li>
        <li>
          The new frog should have one characteristic from mother and one from
          father
        </li>
        <li>
          Use ReactJS + if enough time add styling of your choice to solve this
          one.
        </li>
        <li>
          You dont need to use this provided index file or html code but overall
          game rules must be preserved.
        </li>
      </ul>
      <h1>Frog Lake Game</h1>
      <LakeGrid frogs={frogs} setFrogs={setFrogs} />
    </div>
  );
}

export default App;
