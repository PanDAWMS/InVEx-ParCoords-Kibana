import React from 'react';

import { EuiBadge } from '@elastic/eui';

import "d3";
import "jquery";
import "jquery-ui";

import "datatables.net";
import "datatables.net-jqui";
import "datatables.net-buttons-jqui";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-colreorder-jqui";
import "datatables.net-fixedcolumns-jqui";
import "datatables.net-fixedheader-jqui";
import "datatables.net-responsive-jqui";

import "select2";
import "js-cookie";
import "simple-statistics";
import uniqueId from 'react-html-id';

import ParallelCoordinates from './parallel_coordinates/js/ParallelCoordinates.js';

import "select2/dist/css/select2.css";
import "jquery-ui/themes/base/theme.css";
import "datatables.net-jqui/css/dataTables.jqueryui.css";
import "datatables.net-buttons-jqui/css/buttons.jqueryui.css";
import "datatables.net-colreorder-jqui/css/colReorder.jqueryui.css";
import "datatables.net-fixedcolumns-jqui/css/fixedColumns.jqueryui.css";
import "datatables.net-fixedheader-jqui/css/fixedHeader.jqueryui.css";
import "datatables.net-responsive-jqui/css/responsive.jqueryui.css";

import './parallel_coordinates/css/ParallelCoordinates.css';

///////
//import "mark.js";
//import "datatables.mark.js";
//import('./parallel_coordinates/js/dataTables.alphabetSearch.js');
//import './parallel_coordinates/css/dataTables.alphabetSearch.css';


export class testvizComponent extends React.Component {
    constructor() {
        super();
        uniqueId.enableUniqueIds(this);
    }

  onClick = () => {
    this.props.vis.params.counter++;
    this.props.vis.updateState();
  };

  render() {
    console.log(this);

    let visData = this.props.visData;
    this._id = "ParallelCoordinatesGraph-" + this.nextUniqueId();

    return (
      <div>

          <div id={this._id}></div>

      {/*
      <EuiBadge
          data-test-subj="counter"
          onClick={this.onClick}
          onClickAriaLabel="Increase counter"
          color="primary">

      {this.props.vis.params.counter}

        </EuiBadge>
          <div className="select2-container">AAAAAAAAAAAASDASDAS!</div>
        <br></br>
        <table>
          <thead><tr>
            {visData.columns.map(col => <th id={col.id}> {col.name} </th>)}
          </tr></thead>
          <tbody>
            {visData.rows.map(row =>
              <tr>
                {visData.columns.map(col => <td id={row.id}> {row[col.id]} </td>)}
              </tr>)
            }
          </tbody>
        </table>
        <br></br>
        */}

      </div>
    );
  }

  updatePC(){
      let dims = this.props.visData.columns.map(col => col.name).filter((x,i) => i > 0),
        data = this.props.visData.rows.map( row =>
            this.props.visData.columns.map(col => row[col.id])),
        actual_data = data.map(row => {return [row[0], row.filter((x,i) => i > 0)]});

      this._coords.updateData(this._id,
        dims,
        actual_data,
        [],
        [],
        null,
        null);
  }

  componentDidMount() {
    let dims = this.props.visData.columns.map(col => col.name).filter((x,i) => i > 0),
        data = this.props.visData.rows.map( row =>
            this.props.visData.columns.map(col => row[col.id])),
        actual_data = data.map(row => {return [row[0], row.filter((x,i) => i > 0)]});


     this._coords = new ParallelCoordinates(this._id,
        dims,
        actual_data,
        [],
        [],
        null,
        null);

    this.props.renderComplete();
  }

  componentDidUpdate() {
    this.updatePC();
    this.props.renderComplete();
  }
}