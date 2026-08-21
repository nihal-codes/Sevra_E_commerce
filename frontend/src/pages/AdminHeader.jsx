import { useState } from "react";
import NavButton from "../components/NavButton"
import Settings from "./Settings";

const AdminHeader = () => {
  const [settings, showSettings] = useState(false)
  return (
    <>
      <div className="flex mx-4 my-2 border border-(--truffle)/30  rounded-full justify-between p-4 bg-(--bg) shadow-lg">
        <img src="/Sevra1.png" alt="Website Logo" className="h-12"/>
        <div className="flex gap-4">
          <NavButton name={"Settings"} onMouseOver={() => showSettings(true)} onMouseLeave={() => showSettings(false)}/>
        </div>
      </div>
      <div className="">
        {settings === true && <Settings onMouseOver={() => showSettings(true)} onMouseLeave={() => showSettings(false)}/>}
      </div>
    </>
  )
}

export default AdminHeader;