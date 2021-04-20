import { BrowserRouter, Switch, Route } from "react-router-dom";

import List from "./views/List";
import Details from "./views/Details";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/details/:id" component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
