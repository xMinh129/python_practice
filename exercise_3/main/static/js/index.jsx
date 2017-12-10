import React from "react";
import ReactDOM from "react-dom";
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
import {Switch} from 'react-router-dom';

{/* Import Components */}
{/* import Tables from './components/Tables/Tables'
import Table from './components/Tables/Table'
import NewTable from './components/Tables/New'
import NewRow from './components/Tables/NewRow' */}

import Definitions from './components/Definitions/Definitions'
import Definition from './components/Definitions/Definition'
import NewDef from './components/Definitions/New'
import EditDef from './components/Definitions/Edit'

ReactDOM.render(

  <Router history={browserHistory} >
  	<Switch>
	    <Route exact path="/" component={Definitions} />
      <Route exact path="/api" component={Definitions} />
      <Route exact path="/definitions/new" component={NewDef} />
      <Route exact path="/definitions/:definition_id/edit" component={EditDef} />
      <Route exact path="/definitions/:definition_id" component={Definition} />
    </Switch>
  </Router>,

  document.getElementById('content')

);
