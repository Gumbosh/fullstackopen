const Statistics = ({ ratings }) => {
  const [good, neutral, bad] = ratings;
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  return all === 0 ? (
    <p>No feedback given</p>
  ) : (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </>
  );
};

export default Statistics;
