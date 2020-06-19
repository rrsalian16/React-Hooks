import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from "./Context/Auth-Context";
import Auth from "./components/Auth";

const App = (props) => {
  const authContext = useContext(AuthContext);

  let context = <Auth />;
  if (authContext.isAuth) {
    context = <Ingredients />;
  }

  return context;
};

export default App;
