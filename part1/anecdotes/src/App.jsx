import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const DisplayAnecdote = ({ anecdote }) => {
  return <div>{anecdote}</div>;
};
const DisplayVoteCount = ({ voteCount }) => {
  return <div>has {voteCount} votes</div>;
};

const AnecdoteOfTheDay = ({ anecdote, voteCount }) => {
  return (
    <>
      <h1>Anecdote of the Day</h1>
      <DisplayAnecdote anecdote={anecdote} />
      <DisplayVoteCount voteCount={voteCount} />
    </>
  );
};

const MostPopularAnecdote = ({ anecdotes, voteCounts }) => {
  const maxVal = Math.max(...Object.values(voteCounts));
  const maxKey = Object.keys(voteCounts).find(
    (key) => voteCounts[key] === maxVal,
  );
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[maxKey]}</div>
    </>
  );
};

const getRandom = () => {
  return Math.random();
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [voteCounts, setVoteCounts] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0);

  const selectAnecdote = () => {
    let selectedKey = Math.floor(getRandom() / (1 / anecdotes.length));
    if (selectedKey == 8) {
      selectedKey = 7;
    }
    setSelected(selectedKey);
  };

  const voteForAnecdote = () => {
    const newVoteCounts = {
      ...voteCounts,
      [selected]: voteCounts[selected] + 1,
    };
    setVoteCounts(newVoteCounts);
  };

  // const popularAnecdote = anecdotes[maxKey];

  return (
    <>
      <AnecdoteOfTheDay
        anecdote={anecdotes[selected]}
        voteCount={voteCounts[selected]}
      />
      <Button onClick={voteForAnecdote} text="vote" />
      <Button onClick={selectAnecdote} text="next anecdote" />
      <MostPopularAnecdote anecdotes={anecdotes} voteCounts={voteCounts} />
    </>
  );
};

export default App;
