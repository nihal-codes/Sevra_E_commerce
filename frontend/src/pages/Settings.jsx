const Settings = ({onMouseOver, onMouseLeave}) => {
  return (
    <>
      <div 
      onMouseOver={onMouseOver}
      onMouseOut={onMouseLeave}
      className="absolute right-0 top-16 flex flex-col items-start gap-2 w-fit bg-(--bg) border border-(--oatmeal) rounded-lg p-4 z-99">
        <button 
        className="flex items-center rounded-lg gap-2 cursor-pointer transition-all duration-200 hover:bg-(--oatmeal)/50 px-2 py-1 w-full">
          <i class="ri-edit-line"></i>
          <h2>Reset Password</h2>
        </button>
        <button 
        className="flex items-center rounded-lg gap-2 cursor-pointer transition-all duration-200 hover:bg-(--oatmeal)/50 px-2 py-1 w-full">
          <i class="ri-lock-unlock-line"></i>
          <h2>Forgot Password</h2>
        </button>
        <button 
        className="flex items-center rounded-lg gap-2 cursor-pointer transition-all duration-200 hover:bg-(--oatmeal)/50 px-2 py-1 w-full">
          <i className="ri-logout-box-r-line text-red-600"></i>
          <h2>Logout</h2>
        </button>
      </div>
    </>
  )
}

export default Settings;