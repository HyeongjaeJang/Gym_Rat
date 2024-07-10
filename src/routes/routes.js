import Main from "../pages/Main/Main";
import Home from "../pages/Home/Home";
import Exercises from "../pages/Exercises/Exercises";
import Day from "../pages/Day/Day";
import Update from "../pages/Update/Update";
import Analytics from "../pages/Analytics/Analytics";
import Profile from "../pages/Profile/Profile";
const routes = [
  {
    name: "Main",
    path: "/",
    component: Main,
  },
  {
    name: "Home",
    path: "/home/:id",
    component: Home,
  },
  {
    name: "Exercise",
    path: "/exercise",
    component: Exercises,
  },
  {
    name: "Day",
    path: "/day/:id",
    component: Day,
  },
  {
    name: "Update",
    path: "/update/:id",
    component: Update,
  },
  {
    name: "Analytics",
    path: "/analytics/:id",
    component: Analytics,
  },
  {
    name: "Profile",
    path: "/profile/:id",
    component: Profile,
  },
];

export default routes;
