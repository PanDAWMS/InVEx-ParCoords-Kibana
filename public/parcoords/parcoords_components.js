import React from 'react';

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


export class parcoordsComponent extends React.Component {
    constructor() {
        super();
        uniqueId.enableUniqueIds(this);
    }

    /*onClick = () => {
        this.props.vis.params.counter++;
        this.props.vis.updateState();
    };*/

    render() {
        //console.log(this);

        //let visData = this.props.visData;
        this._id = "ParallelCoordinatesGraph-" + this.nextUniqueId();

        return (
            <div style={{width: "100%"}}>
                <div id={this._id}></div>
            </div>
        );
    }

    updatePC() {
        let vd = this.props.visData,
            dims = vd.columns.map(col => col.name),
            data = vd.rows.map(row => vd.columns.map(col => row[col.id])),
            options = this.props.vis.params.parcoords_params,
            colors = vd.columns[1].name,
            color_scheme = null;

        options.draw.mode = (this.props.vis.params.colors) ? "cluster" : "print";

        if (this._coords === null)
            this._coords = new ParallelCoordinates(this._id, dims, data, colors, color_scheme, options);
        else this._coords.updateData(this._id, dims, data, colors, color_scheme, options);
    }

    componentDidMount() {
        this._coords = null;
        this.updatePC();
        this.props.renderComplete();
    }

    componentDidUpdate() {
        this.updatePC();
        this.props.renderComplete();
    }
}