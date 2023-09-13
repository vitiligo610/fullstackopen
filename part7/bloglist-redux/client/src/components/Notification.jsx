import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  let content, className
  if (notification) {
    content = notification.includes('SUCCESS') ? notification.substring(7) : notification.substring(5)
    className = notification.includes('SUCCESS') ? 'success' : 'error'
  }

  if (!notification) {
    return null
  }

  return (
    <div className={className}>
      {content}
    </div>
  )
}

export default Notification