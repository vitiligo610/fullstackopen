import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const byVotes = (v1, v2) => v2.votes - v1.votes

  return (
    <>
      {anecdotes.sort(byVotes).map(anecdote => <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        vote={() => dispatch(voteAnecdote(anecdote.id))}
      />)}
    </>
  )
}

export default AnecdoteList