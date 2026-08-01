const UserHeader = () => {
  return (
    <>
      <div className="flex justify-between p-4">
        <img src="null" alt="Website Logo" />
        <div className="flex gap-4">
          <button>Cart</button>
          <button>SignUp/SignIn</button>
          <button>Settings</button>
        </div>
      </div>
    </>
  )
}

export default UserHeader