const Notification = ({ message }) => {
  const notification = message
  let content, className

  if (notification) {
    content = notification.includes('SUCCESS') ? notification.substring(9) : notification.substring(6)
    className = notification.includes('SUCCESS') ? 'success' : 'error'
  }
  
  if (!notification) return null

  return (
    <div className={className}>
      {content}
    </div>
  )
}

export default Notification