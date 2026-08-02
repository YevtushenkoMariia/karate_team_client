import PageShell from "../components/PageShell";
import { useNavigate } from "react-router-dom";

export function SettingInside() {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
}

  return <>

  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  onClick={handleLogout}>
    Log out 
  </button>



  </>
}

export default function Settings() {
  return <PageShell title="Налаштування" children={<SettingInside />} />;
}
