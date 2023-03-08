import { FiHome, FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-20 bg-green-600">
      <div className="h-full flex flex-row justify-between items-center mx-auto text-white 2xl:max-w-4xl">
        <div className="font-bold text-2xl">Catatanku</div>
        <div className="flex flex-row flex-wrap gap-5">
          <Link to="/">
            <div className="bg-green-700 p-5 rounded-md">
              <FiHome size={20} />
            </div>
          </Link>
          <Link to="/add">
            <div className="bg-green-700 p-5 rounded-md">
              <FiPlusCircle size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
