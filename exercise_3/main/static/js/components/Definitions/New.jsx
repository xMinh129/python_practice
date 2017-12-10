import React, {Component} from 'react';

import axios from 'axios';

const Link = require('react-router-dom').Link;


/****************************  AddDefinitionComp  ******************************/

class NewDef extends React.Component {

    constructor(props) {
    super(props);
    // Declaring initial state
      this.state = {

      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleSubmit(e){

      e.preventDefault()
      console.log(this.refs.definition.value)
      axios({
        method: 'post',
        url: '/api/definitions/new',
        data: {
          definition: this.refs.definition.value,
          columns: this.refs.columns.value
        }
      })
      .then(function(response) {
        console.log(response)
      });
      window.alert("New definition created");
      this.props.history.push('/');

    }

    render(){
      return (

        <div className="container">
          <div className="btn btn-add">
              <Link to={'/'}><span className="pe-7s-angle-left-circle return"></span>Definition List</Link>
          </div>

          <form onSubmit={(e) => this.handleSubmit(e)}>
            <table>
              <tbody>
                <tr>
                  <td>Definition</td>
                  <td><input type="text" ref='definition' /></td>
                </tr>
                <tr>
                  <td>columns</td>
                  <td><input type="text" ref='columns' /></td>
                </tr>
                <tr>
                  <td><input type="submit" value="Save" /></td>
                </tr>
              </tbody>
            </table>

          </form>

        </div>

    );
  }

};

export default NewDef;
