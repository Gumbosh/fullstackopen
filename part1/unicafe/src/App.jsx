import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClickHandler = () => setGood(good + 1);
  const neutralClickHandler = () => setNeutral(neutral + 1);
  const badClickHandler = () => setBad(bad + 1);

  return (
    <div>
      <h1>give Feedback</h1>
      <Button onClick={goodClickHandler} text="good" />
      <Button onClick={neutralClickHandler} text="neutral" />
      <Button onClick={badClickHandler} text="bad" />
      <h2>statistics</h2>
      <Statistics ratings={[good, neutral, bad]} />
    </div>
  );
};

export default App;
