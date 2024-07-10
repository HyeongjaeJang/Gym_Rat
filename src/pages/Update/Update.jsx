import React, { useState } from "react";
import Header from "../../components/Header/Header";
import UpdateForm from "../../components/UpdateForm/UpdateForm";
import "./Update.scss";

const Update = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Header collapsed={collapsed} func={handleCollapsedChange} />
      <UpdateForm />
    </>
  );
};

export default Update;
