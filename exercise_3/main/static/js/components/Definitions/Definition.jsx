import React, {Component} from 'react';

import axios from 'axios';

const Link = require('react-router-dom').Link;

/****************************  DefinitionComp  ******************************/

class Definition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      definition: ''
    }
    this.loadDefinitionFromServer = this.loadDefinitionFromServer.bind(this);
  }

 loadDefinitionFromServer(){

   const definition_id = this.props.match.params.definition_id;
   axios
     .get(`/api/definitions/${definition_id}`)
     .then(resp => {
       console.log(resp.data)
       this.setState({
         definition: resp.data
       });
     })
     .catch(console.error);
 }

 componentWillMount() {
     this.loadDefinitionFromServer();
 }

 componentDidMount() {
     this.loadDefinitionFromServer();
 }

 componentDidCatch(error) {
  this.setState({error})
 }

 render(){

    const definition = this.state.definition;
    const definition_id = this.props.match.params.definition_id;

    return(
      <div>
        <div className="btn btn-add">
            <Link to={'/'}><span className="pe-7s-angle-left-circle return"></span>Definition List</Link>
        </div>
        <div><h3>Definition of Tables: {definition.definition}</h3></div>
        <div><h3>Column Names: {definition.columns}</h3></div>
        <div className="btn btn-add">
          <Link to={`/definitions/${definition_id}/tables/new`}><i className="fa fa-plus"></i>Add Table</Link>
        </div>
      </div>

    )

  }

}

export default Definition;
