import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import "./App.scss";
import AuthRedirect from "./utils/AuthRedirect";

function App() {
  return (
    <>
      <Router>
        <AuthRedirect />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
