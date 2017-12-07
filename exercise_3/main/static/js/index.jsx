import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
import {Switch} from 'react-router-dom';

{/* Import Components */}
import Definitions from './components/Definitions/Definitions'
import NewDef from './components/Definitions/New'
import Tables from './components/Tables/Tables'
import Table from './components/Tables/Table'
import NewTable from './components/Tables/New'
import NewRow from './components/Tables/NewRow'


ReactDOM.render(

  <Router history={browserHistory} >
  	<Switch>
	    <Route exact path="/" component={Definitions} />
      <Route exact path="/definitions/new" component={NewDef} />
      <Route exact path="/definitions/:definition_id/tables" component={Tables} />
      <Route exact path="/definitions/tables/:table_id" component={Table} />
      <Route exact path="/definitions/tables/new" component={NewTable} />
      <Route exact path="/definitions/tables/rows/new_row" component={NewRow} />
    </Switch>
  </Router>,

  document.getElementById('content')

);
