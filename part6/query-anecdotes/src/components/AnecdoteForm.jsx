import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useDispatchValue } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useDispatchValue()

  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5)
      return
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    await dispatch({ type: 'SHOW_NOTIFICATION', payload: `anecdote '${content}' added` })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={e => onCreate(e)}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
