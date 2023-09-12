import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  let className, notificationString
  if (notification) {
    className = notification.includes('SUCCESS') ? 'success' : 'error'
    notificationString = notification.includes('SUCCESS') ? notification.substring(7) : notification.substring(5)
  }

  if (!notification) {
    return null
  }

  return (
    <>
      <div className={className}>
        {notificationString}
      </div>
    </>
  )
}

export default Notification