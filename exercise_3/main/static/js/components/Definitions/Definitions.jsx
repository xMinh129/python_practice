import React from 'react';

import axios from 'axios';

import DefinitionList from './DefinitionList';

var Link = require('react-router-dom').Link;

class Definitions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      definitions: ''
    }
    this.loadDefinitionsFromServer = this.loadDefinitionsFromServer.bind(this);
  }


  loadDefinitionsFromServer() {
     // Fetch data from server...

    axios.get('/api/all_defs')
      .then(resp => {
        console.log(resp.data)
        this.setState({
          definitions: resp.data
        });

      })
      .catch(console.error);

  }

  componentDidMount() {
      this.loadDefinitionsFromServer();
  }

  componentWillMount() {
      this.loadDefinitionsFromServer();
  }

  componentDidUpdate(){
      this.loadDefinitionsFromServer();
  }

  componentDidCatch(error) {
   this.setState({error})
  }

  render(){

    const definitions = this.state.definitions

    if (definitions){
      return(
        <div>
          <div className="table-responsive">
            <table id="dataTableExample1" className="table table-bordered table-striped table-hover">
               <thead>
                  <tr className="info">
                     <th>Definition</th>
                     <th>Column Names</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                 {Object.keys(definitions).map(definitionIndex =>
                   <DefinitionList
                   key={definitionIndex}
                   {...definitions[definitionIndex]} />
                 )}
               </tbody>
            </table>
          </div>

          <div className="btn btn-add">
            <Link to={'/definitions/new'}><i className="fa fa-plus"></i>Add Definition</Link>
          </div>
        </div>
      )
    } else {
      return(
        <div>Loading Data...</div>
      )
    }

  }

}

export default Definitions;
