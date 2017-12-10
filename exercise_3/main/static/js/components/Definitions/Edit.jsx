import React, {Component} from 'react';

import axios from 'axios';

var Link = require('react-router-dom').Link;

/****************************  EditDefinitionComp  ******************************/

class EditDef extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	definition_id: this.props.match.params.definition_id,
      definition: {}

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadDefinitionFromServer = this.loadDefinitionFromServer.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  loadDefinitionFromServer(){

    const definition_id = this.props.match.params.definition_id;
    axios
      .get(`/api/definitions/${definition_id}`)
      .then(resp => {
        this.setState({
          definition: resp.data
        });
      })
      .catch(console.error);
  }

   handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
   }

  handleSubmit(e){
    const definition_id = this.props.match.params.definition_id;
    e.preventDefault()
    axios({
      method: 'put',
      url: '/api/definitions/' + definition_id + '/edit' ,
      data: {
        definition: this.refs.new_definition.value,
        columns: this.refs.new_columns.value
      }
    })
    .then(function(response) {
      console.log(response)
    });

  	window.alert("Definition updated");
  	this.props.history.push(`/definitions/${definition_id}`);

  }

  componentWillMount(){
  	this.loadDefinitionFromServer();
  }

  componentDidMount(){
  	this.loadDefinitionFromServer();
  }

  render(){

  	return(
  		<div className="container">
        <div className="btn btn-add">
            <Link to={'/'}><span className="pe-7s-angle-left-circle return"></span>Definition List</Link>
        </div>

	      <h3>Edit Defintion</h3>
	      <form onSubmit={(e) => this.handleSubmit(e)}>
	        <table>
	          <tbody>
	            <tr>
	              <td>Name</td>
	              <td><input type="text" ref="new_definition" name="definition" value={this.state.definition.definition} onChange={this.handleChange} /></td>
	            </tr>
	            <tr>
	              <td>Columns</td>
	              <td><input type="text" ref="new_columns" name="columns" value={this.state.definition.columns} onChange={this.handleChange} /></td>
	            </tr>
              <tr>
	              <td><button type="submit">Update</button></td>
	              <td><button className="form-cancel"><Link to={`/definitions/${this.state.definition_id}`}>Cancel</Link></button></td>
		            </tr>
	          </tbody>
	        </table>
	      </form>
		  </div>
  	)

  }

}

export default EditDef;
