import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Dialogs from "./containers/Dialogs";
import Main from "./containers/Main";

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Dialogs />
          <Route exact path="/" component={Main} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
