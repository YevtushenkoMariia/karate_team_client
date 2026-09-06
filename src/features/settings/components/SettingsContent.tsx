import { useNavigate } from "react-router-dom";
import clsx from "clsx";
// import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function SettingsContent() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-green-200 w-full overflow-hidden">
       <button
        className={clsx(
          "bg-(--red) hover:bg-(--middle-red) text-white text-sm font-bold py-2 px-8 rounded-full",
          "  transition-opacity hover:opacity-90 items-center  font-medium",
        )}
        onClick={handleLogout}
      >
        Вийти 
      </button>

      <div>
        <p className="text-page-title"> Text page title </p>
        <p className="text-section-title"> Text section title </p>
        <p className="text-body"> Text body </p>
        <p className="text-body-bold"> Text body medium </p>
        <p className="text-label"> Text label </p>
         <p className="text-caption"> Text caption </p>
          <p className="text-button"> Text button </p>
           <p className="text-small"> Text small </p>
        


 

      </div>
     
    </div>
  );
}
