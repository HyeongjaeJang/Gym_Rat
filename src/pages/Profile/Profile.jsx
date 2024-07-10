import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useUser from "../../utils/hooks/useUser";
import Header from "../../components/Header/Header";
import ProfileCom from "../../components/PofileCom/ProfileCom";
const Profile = () => {
  const { id } = useParams();
  const { user, error } = useUser(id);
  const [collapsed, setCollapsed] = useState(true);
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      {user && (
        <Header
          collapsed={collapsed}
          func={handleCollapsedChange}
          head={user.name}
        />
      )}
      <ProfileCom user={user} />
    </>
  );
};

export default Profile;
