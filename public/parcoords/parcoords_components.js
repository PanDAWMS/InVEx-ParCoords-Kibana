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
            <div>
                <div id={this._id}></div>
            </div>
        );
    }

    updatePC() {
        let vd = this.props.visData,
            dims = vd.columns.map(col => col.name).filter((x, i) => i > 0),
            data = vd.rows.map(row => vd.columns.map(col => row[col.id])),
            actual_data = data.map(row => {
                return [row[0], row.filter((x, i) => i > 0)
                    .map(y => (y === null) ? 0 : y)]
            }),
            options = this.props.vis.params.parcoords_params,
            colors = [],
            color_scheme = {};

        options.draw.mode = "print";

        if (this.props.vis.params.colors)
        {
            colors = actual_data.map((x) => x[1][0]);

            /* colors: (230, 25, 75), (60, 180, 75), (0, 130, 200),
                (245, 130, 48), (145, 30, 180), (70, 240, 240), (240, 50, 230),
                (210, 245, 60), (250, 190, 190), (0, 128, 128), (230, 190, 255),
                (170, 110, 40), (255, 250, 200), (128, 0, 0), (170, 255, 195),
                (128, 128, 0), (255, 215, 180), (0, 0, 128), (255, 225, 25)*/

            let _red = [230, 60, 0, 245, 145, 70, 240, 210, 250, 0, 230, 170, 255, 128, 170, 128, 255, 0, 255, 0],
                _green = [25, 180, 130, 130, 30, 240, 50, 245, 190, 128, 190, 110, 250, 0, 255, 128, 215, 0, 225, 128],
                _blue = [75, 75, 200, 48, 180, 240, 230, 60, 190, 128, 255, 40, 200, 0, 195, 0, 180, 128, 25, 64],

                clusters_unique = [...new Set(colors)].sort((a, b) => a - b),
                len = clusters_unique.length;

            for (let i = 0; i < len; i++)
                color_scheme[clusters_unique[i]] =
                    {
                        r: _red[i]/255.,
                        g: _green[i]/255.,
                        b: _blue[i]/255.
                    };

            options.draw.mode = "cluster";
        }

        options.draw.first_column_name = vd.columns[0].name;

        //console.log(actual_data, colors, color_scheme, options);

        if (this._coords === null)
            this._coords = new ParallelCoordinates(this._id, dims, actual_data, colors, color_scheme, null, null, options);
        else this._coords.updateData(this._id, dims, actual_data,
            colors, color_scheme, null, null, options);
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