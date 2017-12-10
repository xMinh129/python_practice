import React, {Component} from 'react';

import axios from 'axios';

const Link = require('react-router-dom').Link;

/****************************  DefinitionListComp  ******************************/


class DefinitionList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      definition_id: this.props.id
    }
    this.deleteDefinition = this.deleteDefinition.bind(this);
  }

 deleteDefinition(){
   axios({
   method:'delete',
   url:'/api/definitions/' + this.state.definition_id + '/delete'
  })
   .then(function(response) {
      console.log(response)
  });

  window.alert("Deleting definition");
 }

 render(){

    return (
      <tr className="patient-row">
	      <td><Link to={`/definitions/${this.props.id}`}>{this.props.definition}</Link></td>
	      <td>{this.props.columns}</td>
        <td>
          <button className="btn btn-edit"><Link to={`/definitions/${this.props.id}/edit`}><i className="fa fa-pencil" aria-hidden="true"></i></Link></button>
          <button className="btn btn-delete" onClick = {this.deleteDefinition}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
        </td>
	    </tr>
    )

  }

}

export default DefinitionList;
