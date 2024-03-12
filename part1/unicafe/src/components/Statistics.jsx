import StatisticLine from "./StatisticLine";

const Statistics = ({ ratings }) => {
  const [good, neutral, bad] = ratings;
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  return all === 0 ? (
    <p>No feedback given</p>
  ) : (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={`${positive}%`} />
    </table>
  );
};

export default Statistics;
