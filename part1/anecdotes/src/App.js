import { useState } from "react"

const Anecdote = ({ anecdote, points }) => {
  return (
    <p>"{anecdote}"<br /> has {points} votes</p>
  )
}

const MostVotesAnecdote = ({ anecdote, points }) => {
  return (
    <p>"{anecdote}"<br /> has {points} votes"</p>
  )
}

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ]

    const [points, setPoints] = useState(
      Array.from({length: 8}, () => Math.floor(Math.random() * 40))
    )

    const [selected, setSelected] = useState(0)

    const handleClick = () => {
      setSelected(Math.floor(Math.random() * anecdotes.length))
      console.log(points)
    }

    const handleVote = () => {
      const copy = [...points]
      copy[selected] += 1
      setPoints(copy)
      console.log(points);
    }

    const highest = [...points].indexOf(Math.max(...points))

    return (
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleClick}>Next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <MostVotesAnecdote anecdote={anecdotes[highest]} points={points[highest]} />
      </div>
    )
}

export default App
