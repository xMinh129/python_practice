import React from 'react';

import ReactDOM from 'react-dom';

import TableMap from './TableMap';

const Link = require('react-router-dom').Link;


/****************************  AllTablesComp  ******************************/

//Rendering Header and Patient List using App component
class AllTables extends React.Component {
  constructor(props) {
    super(props);
    // Declaring initial state
    this.state = {
      tables = this.props.tables
    };
    this.mapTablesToObj = this.mapTablesToObj.bind(this);
  }

  mapTablesToObj(){
    this.setState({
      tables: this.props.tables.data.reduce((obj, table) => {
        obj[table._id] = table;
        return obj;
      }, {}),

    });
  }

  render(){
    return(
      <TableMap
      tables={this.state.tables}
      />
    )
  }
}

export default AllTables
