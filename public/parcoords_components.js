import React from 'react';
import uniqueId from 'react-html-id';
//import * from '@PanDAWMS/invex-parallel-coordinates/dist';

const ParallelCoordinates = require('@PanDAWMS/invex-parallel-coordinates/dist').default;

export class parcoordsComponent extends React.Component {
    constructor() {
        super();
        uniqueId.enableUniqueIds(this);
    }

    render() {
        this._id = "ParallelCoordinatesGraph-" + this.nextUniqueId();

        return (
            <div style={{width: "100%"}}>
                <div id={this._id}> </div>
            </div>
        );
    }

    updatePC() {
        //console.log('update', this);

        let vd = this.props.visData,
            dims = vd.columns.map(col => col.name),
            data = vd.rows.map(row => vd.columns.map(col => row[col.id])),
            options = this.props.vis.params.parcoords_params,
            colors = this.props.vis.params.color_feature[0].label,
            color_scheme = undefined;

        //console.log('update2', this, vd, dims, data, options, colors, color_scheme);


        options.draw.mode = (this.props.vis.params.colors) ? "cluster" : "print";
        options.skip.dims.mode = 'show';
        options.skip.dims.values = this.props.vis.params.selected_options.map(x => x.label);

        //console.log('update3', this.props.vis.params.colors); //why??
        // constructor(element_id, dimension_names, data_array, clusters_list, clusters_color_scheme, options = {})

        if (this._coords === null)
            this._coords = new ParallelCoordinates(this._id, dims, data, colors, color_scheme, options);
        else this._coords.updateData(this._id, dims, data, colors, color_scheme, options);

        //console.log('update4', this);
    }

    componentDidMount() {
        this._coords = null;
        this.updatePC();
        //this.props.renderComplete();
        this.props.renderComplete();
    }

    componentDidUpdate() {
        this.updatePC();
        //this.props.renderComplete();
        this.props.renderComplete();
    }
}
