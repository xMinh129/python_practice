import React, {Component} from 'react';

import axios from 'axios';

const Link = require('react-router-dom').Link;


/****************************  AddTableComp  ******************************/

class NewTable extends React.Component {

    constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleSubmit(e){

      const definition_id = this.props.match.params.definition_id;
      e.preventDefault()
      axios({
        method: 'post',
        url: '/api/definitions/' + definition_id + '/tables/new',
        data: {
          table_header: this.refs.table_header.value,
          num_rows: this.refs.num_rows.value
        }
      })
      .then(function(response) {
        console.log(response)
      });
      window.alert("New table created");
      this.props.history.push(`/definitions/${definition_id}`);

    }

    render(){

      const definition_id = this.props.match.params.definition_id;

      return (

        <div className="container">
          <div className="btn btn-add">
              <Link to={`/definitions/${definition_id}`}><span className="pe-7s-angle-left-circle return"></span>Back to Definition </Link>
          </div>

          <form onSubmit={(e) => this.handleSubmit(e)}>
            <table>
              <tbody>
                <tr>
                  <td>Table Header</td>
                  <td><input type="text" ref='table_header' /></td>
                </tr>
                <tr>
                  <td>Number of rows</td>
                  <td><input type="number" ref='num_rows' /></td>
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

export default NewTable;
