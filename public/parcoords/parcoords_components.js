import React from 'react';
import uniqueId from 'react-html-id';
import ParallelCoordinates from '@PanDAWMS/invex-parallel-coordinates';

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
        let vd = this.props.visData,
            dims = vd.columns.map(col => col.name),
            data = vd.rows.map(row => vd.columns.map(col => row[col.id])),
            options = this.props.vis.params.parcoords_params,
            colors = this.props.vis.params.color_feature[0].label,
            color_scheme = null;

        options.draw.mode = (this.props.vis.params.colors) ? "cluster" : "print";
        options.skip.dims.mode = 'show';
        options.skip.dims.values = this.props.vis.params.selected_options.map(x => x.label);

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