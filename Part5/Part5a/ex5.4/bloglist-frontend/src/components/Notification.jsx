const Notification = ( {notif, error} ) => {
  if (notif === null && error === null) return null
  else if (notif === null && error !== null) {
    return (
      <div className='error'>
        {error}
      </div>
    )
  }
  return (
    <div className='notif'>
      {notif}
    </div>
  )
}

export default Notification 