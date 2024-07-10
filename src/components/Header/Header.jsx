import { useParams, useNavigate } from "react-router-dom";
import SidebarCom from "../Sidebar/SidebarCom";
import { FaBars } from "react-icons/fa";
import profile from "/assets/profile.svg";
import moment from "moment";
import "./Header.scss";
const Header = ({ collapsed, func, day, head }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (day) {
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };

    const formatDate = (date) => {
      const month = moment(date).format("MMMM");
      const day = moment(date).format("D");
      return `${month}-${day}${getOrdinal(day)}`;
    };
    const date = formatDate(day);
    return (
      <section className="header">
        <button className="toggle-btn" onClick={func}>
          <FaBars />
        </button>
        {!collapsed && <SidebarCom collapsed={collapsed} func={func} />}
        <h1 className="header__title w-4.5/12">{date}</h1>
        <img
          src={profile}
          alt="profile-icon"
          onClick={() => navigate(`/profile/${id}`)}
          className="profile-icon"
        />
      </section>
    );
  }
  if (head) {
    return (
      <section className="header">
        <button className="toggle-btn" onClick={func}>
          <FaBars />
        </button>
        {!collapsed && <SidebarCom collapsed={collapsed} func={func} />}
        <h1 className="header__title w-3.5/12">{head}</h1>
        <img
          src={profile}
          alt="profile-icon"
          onClick={() => navigate(`/profile/${id}`)}
          className="profile-icon"
        />
      </section>
    );
  }
  return (
    <section className="header">
      <button className="toggle-btn" onClick={func}>
        <FaBars />
      </button>
      {!collapsed && <SidebarCom collapsed={collapsed} func={func} />}
      <h1 className="header__title w-3.5/12">GymRat</h1>
      <img
        src={profile}
        alt="profile-icon"
        onClick={() => navigate(`/profile/${id}`)}
        className="profile-icon"
      />
    </section>
  );
};

export default Header;
