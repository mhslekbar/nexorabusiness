import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router";
import { logoutApi } from "../../redux/login/loginApiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { useTranslation } from "react-i18next";
import { clearUserApi } from "../../redux/users/UserApiCalls";
import { clearRoleApi } from "../../redux/roles/roleApiCalls";
import { clearPermissionApi } from "../../redux/permissions/permissionApiCalls";

interface HeaderInterface {
  toggleOffcanvas?: any;
}

const Header: React.FC<HeaderInterface> = ({ toggleOffcanvas }) => {
  const { userData } = useSelector((state: State) => state.login)

  const navigate = useNavigate()
  const dispatch: any = useDispatch()

  const handleLogout = async () => {
    try {
      await dispatch(logoutApi)
      await dispatch(clearPermissionApi)
      await dispatch(clearRoleApi)
      await dispatch(clearUserApi)
      localStorage.removeItem("timeOut")
      localStorage.removeItem("StoreType")
      // localStorage.removeItem(`persist:${companyName}`)      
      navigate("/login", { replace: true });
    } catch {}
  }

  const { t } = useTranslation()

  const ToggleHomePage = () => {
    if(userData?.username) {
      navigate("/")
    } 
    if(!userData._id) {
      toggleOffcanvas()
    }
  }

  return (
    <header className="bg-main p-4 mx-auto flex justify-between items-center"> {/* fixed w-full -mt-4 */}
      {/* Left section */}
      <div>
        <button
          className={`bg-[#FFF] text-main 
              hover:bg-main hover:text-[#FFF]
              border-2 border-[#FFF]
              font-bold py-2 px-4 rounded
            `}
          onClick={() => ToggleHomePage()}
        >
          {userData?.username ? userData?.username : (userData?.fullName ?? "Home page")}
        </button>
      </div>

      {/* Middle section */}
      <h1 className="text-white lg:text-2xl font-bold col-span-2 col-start-2 text-center uppercase">
        <span className="hidden md:block">{t("MERN TEMPLATE EXAMPLE WEB SCREEN")}</span>
        <span className="block md:hidden">{t("MERN TEMPLATE EXAMPLE MOB SCREEN")}</span>
      </h1>

      {/* Right section */}
      <div className="flex items-center">
        {(userData?.username || userData?.fullName) ? 
          <AiOutlinePoweroff className="text-red font-bold text-3xl mr-2" onClick={handleLogout} />
          :
          <div
            className={`bg-[#FFF] text-main 
                border-2 border-[#FFF]
                font-bold py-2 px-2 rounded-full
              `}
            onClick={() => navigate("/login")}
          >
            <img className="w-10 h-10" src="/assets/images/key.png" alt=""/>
          </div>
        }
      </div>
    </header>
  );
};

export default Header;
