import { useState } from "react";

const SectionHeading = ({ title }) => {
  return <h2>{title}</h2>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

function capitalizeStrict(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{capitalizeStrict(text)}:</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) {
    return (
      <>
        <SectionHeading title="Statistics"></SectionHeading>
        <div>No feedback given</div>
      </>
    );
  }
  return (
    <>
      <SectionHeading title="Statistics"></SectionHeading>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine
            text="average rating"
            value={(good * 1 + bad * -1) / total}
          />
          <StatisticLine
            text="positive review percentage"
            value={(good / total) * 100 + "%"}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <SectionHeading title="Give Feedback"></SectionHeading>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
