import "./App.css";
import Landing from "./pages/Landing/Landing";
import Router from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { useContext, useEffect } from "react";
import { auth } from "./Utility/firebase";
import { TYPE } from "./Utility/action.type";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: TYPE.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: TYPE.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (
    <>
      {/* <Landing /> */}
      <Router />
    </>
  );
}

export default App;
