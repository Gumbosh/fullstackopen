import { useState } from "react";
import Button from "./components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const goodClickHandler = () => {
    const newGood = good + 1;
    setGood(newGood);
    const newAll = newGood + neutral + bad;
    setAll(newAll);
    setAverage((newGood - bad) / newAll);
    setPositive((newGood / newAll) * 100);
  };
  const neutralClickHandler = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    const newAll = good + newNeutral + bad;
    setAll(newAll);
    setAverage((good - bad) / newAll);
    setPositive((good / newAll) * 100);
  };
  const badClickHandler = () => {
    const newBad = bad + 1;
    setBad(newBad);
    const newAll = good + neutral + newBad;
    setAll(newAll);
    setAverage((good - newBad) / newAll);
    setPositive((good / newAll) * 100);
  };

  return (
    <div>
      <h1>give Feedback</h1>
      <Button onClick={goodClickHandler} text="good" />
      <Button onClick={neutralClickHandler} text="neutral" />
      <Button onClick={badClickHandler} text="bad" />
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  );
};

export default App;
