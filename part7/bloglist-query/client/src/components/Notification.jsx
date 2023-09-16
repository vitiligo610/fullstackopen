import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification)
    return null

  let content, status
  if (notification) {
    content = notification.includes('SUCCESS') ? notification.substring(7) : notification.substring(5)
    status = notification.includes('SUCCESS') ? 'success' : 'error'
  }

  return (
    <div className={status}>
      {content}
    </div>
  )
}

export default Notification
