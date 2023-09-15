const Notification = ({ error, success }) => {
  if (!error && !success)
  {
    return null
  }

  return (
    <>
      {error && <div className="error">
        {error}
      </div>}
      {success && <div className="success">
        {success}
      </div>}
    </>
  )
}

export default Notification