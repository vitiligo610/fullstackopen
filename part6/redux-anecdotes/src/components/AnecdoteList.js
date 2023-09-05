import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL')
      return state.anecdotes
    const regex = new RegExp( state.filter, 'i' )
    return state.anecdotes.filter(anecdote => anecdote.content.match(regex))
  })

  const byVotes = (v1, v2) => v2.votes - v1.votes

  return (
    <>
      {anecdotes.sort(byVotes).map(anecdote => <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        vote={() => {
          dispatch(voteAnecdote(anecdote.id))
          dispatch(setNotification(`you voted '${anecdote.content}'`))
        }}
      />)}
    </>
  )
}

export default AnecdoteList