import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import {
  StyledButton,
  StyledFormHeading,
  StyledSpan,
  StyledInput
} from './styledComponents'

const BlogForm = ({ toggleForm }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const createBlog = async (e) => {
    e.preventDefault()
    const blogObject = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }
    try {
      await blogService.create(blogObject).then((returnedBlog) => {
        const blogToDispatch = {
          ...returnedBlog,
          user: {
            name: user.name,
            username: user.username,
            id: returnedBlog.user.id
          }
        }
        dispatch(addBlog(blogToDispatch))
        dispatch(
          setNotification(
            'success',
            `a new blog '${e.target.title.value}' by '${e.target.author.value}' added`
          )
        )
      })
    } catch (error) {
      dispatch(
        setNotification('error', `cannot add blog '${blogObject.title}'`)
      )
    }
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
    toggleForm()
  }

  return (
    <form onSubmit={createBlog} col-width='50px'>
      <div>
            <StyledFormHeading>create new</StyledFormHeading>
        <table>
          <tbody>
            <tr>
              <td style={{width:'60px'}}>
                <StyledSpan>Title</StyledSpan>
              </td>
              <td>
                <StyledInput name='title' type='text' required />
              </td>
            </tr>
            <tr>
              <td>
                <StyledSpan>Author</StyledSpan>
              </td>
              <td>
                <StyledInput name='author' type='text' required />
              </td>
            </tr>
            <tr>
              <td>
                <StyledSpan>URL</StyledSpan>
              </td>
              <td>
                <StyledInput name='url' type='text' required />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
      <div></div>
      <StyledButton>create</StyledButton>
    </form>
  )
}

export default BlogForm
