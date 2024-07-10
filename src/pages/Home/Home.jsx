import React, { useState } from "react";
import Header from "../../components/Header/Header";
import HomeCom from "../../components/HomeCom/HomeCom";

const Home = () => {
  const [collapsed, setCollapsed] = useState(true);
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <Header collapsed={collapsed} func={handleCollapsedChange} />
      <HomeCom collapsed={collapsed} func={handleCollapsedChange} />
    </div>
  );
};

export default Home;
