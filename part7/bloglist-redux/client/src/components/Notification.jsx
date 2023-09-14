import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  let content, status
  if (notification) {
    content = notification.includes('SUCCESS') ? notification.substring(7) : notification.substring(5)
    status = notification.includes('SUCCESS') ? 'success' : 'error'
  }

  if (!notification) {
    return null
  }

  return (
    <div className={status}>
      {content}
    </div>
  )
}

export default Notification