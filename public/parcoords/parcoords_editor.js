import React, {Fragment} from 'react';

import { EuiPanel, EuiButtonToggle, EuiTitle, EuiSpacer, EuiFlexGrid, EuiHorizontalRule,
    EuiFlexGroup, EuiFlexItem, EuiIconTip, EuiCheckbox, EuiComboBox, EuiFormRow } from '@elastic/eui';

export class parcoordsEditor extends React.Component {
    constructor(props) {
        super(props);

        this._pc = this.props.stateParams.parcoords_params;
        this._visible = this._pc.draw.parts_visible;
    }

    onToggleChange = (e, component) => {
        let _pc = this.props.stateParams.parcoords_params;

        switch (component) {
            case 'colors':
                this.props.setValue('colors', !this.props.stateParams.colors);
                return;
            case 'debug':
                _pc.debug = !_pc.debug;
                break;
            default:
                _pc.draw.parts_visible[component] = !_pc.draw.parts_visible[component]
        }

        this._pc = _pc;
        this._visible = this._pc.draw.parts_visible;

        this.props.setValue('parcoords_params', _pc);
    };

    onFeatureListChange = selected => {
        this._selected_features = selected;
        this.props.setValue('selected_options', selected);
    };

    onColorChange = selected => {
        this._color_feature = selected;
        this.props.setValue('color_feature', selected);
    };


    render() {
        //console.log('editor_render', this);

        let features = this.props.aggsLabels.split(','),
            lastBucket = '';
        this._selected_features = this.props.stateParams.selected_options;
        this._color_feature =  this.props.stateParams.color_feature;

        if (features.length === 0 || features[0] === '') return null;

        for(let i = this.props.aggs.aggs.length - 1; i > 0 && lastBucket === ''; i--)
        {
            let x = this.props.aggs.aggs[i];
            if (!x.enabled || !x.hasOwnProperty('__type')) continue;
            if (x.__type.type === "buckets" && x.params.field !== undefined)
                lastBucket = x.params.field.displayName;
        }

        this._box_options = features.map(x => {return { label: x }});

        if (typeof this._selected_features === 'undefined' || this._selected_features === null
            || this._selected_features.length === 0)
        {
            this._selected_features = this._box_options;
            this.props.setValue('selected_options', this._box_options);
        }

        else {
            let checked = this._box_options.filter(x =>
                this._selected_features.some(y =>  x.label === y.label));

            if (checked.length !== this._selected_features.length) {
                this._selected_features = this._box_options;
                this.props.setValue('selected_options', checked);
            }
        }

        if (typeof this._color_feature === 'undefined' || this._color_feature === null ||
            this._color_feature.length === 0 || typeof this._color_feature[0] === 'undefined' ||
            !features.some(x => x === this._color_feature[0].label))
        {
            let index = this._box_options.findIndex(x => x.label.includes(lastBucket));

            this._color_feature = [this._box_options[(index !== -1) ? index : 0]];
            this.props.setValue('color_feature', this._color_feature);
        }

        return (
            <div className="eEditorMenu">
                <EuiPanel>
                    <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
                        <EuiFlexItem grow={false}>
                            <EuiTitle size="xs">
                                <h3>Graph parts visibility</h3>
                            </EuiTitle>
                        </EuiFlexItem>

                        <EuiFlexItem grow={false}>
                            <EuiIconTip
                                content="You can hide some parts of the diagram"
                                position="right"
                            />
                        </EuiFlexItem>
                    </EuiFlexGroup>

                    <EuiSpacer size="s"/>

                    <EuiButtonToggle
                        label="Table representing the data"
                        iconType={this._visible.table ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'table')}
                        isSelected={this._visible.table}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />

                    <EuiSpacer size="xs"/>

                    <EuiButtonToggle
                        label="Hint under the graph"
                        iconType={this._visible.hint ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'hint')}
                        isSelected={this._visible.hint}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />

                    <EuiSpacer size="xs"/>

                    <EuiButtonToggle
                        label="Selector"
                        iconType={this._visible.selector ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'selector')}
                        isSelected={this._visible.selector}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />

                    <EuiSpacer size="xs"/>

                    <EuiButtonToggle
                        label="Table advanced controls"
                        iconType={this._visible.table_colvis ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'table_colvis')}
                        isSelected={this._visible.table_colvis}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />

                    <EuiSpacer size="xs"/>

                    <EuiButtonToggle
                        label="Cluster information"
                        iconType={this._visible.cluster_table ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'cluster_table')}
                        isSelected={this._visible.cluster_table}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />
                </EuiPanel>

                <EuiSpacer size="s"/>

                 <EuiPanel>
                    <EuiTitle size="xs">
                        <h3>Display options</h3>
                    </EuiTitle>

                    <EuiSpacer size="s"/>

                     <EuiFormRow
                        label="Visible features"
                        helpText="Features to be displayed on the graph">
                        <EuiComboBox
                            options={this._box_options}
                            selectedOptions={this._selected_features}
                            isClearable={false}
                            onChange={this.onFeatureListChange}
                            //onCreateOption={this.onCreateOption}
                        />
                     </EuiFormRow>

                    <EuiSpacer size="xs"/>

                    <EuiHorizontalRule size="half" />

                    <EuiCheckbox
                        id={"ColorCheckbox"}
                        label="Add colors: "
                        checked={this.props.stateParams.colors}
                        onChange={(e) => this.onToggleChange(e, 'colors')}
                    />

                    <EuiComboBox
                        placeholder="Select a single option"
                        singleSelection={{ asPlainText: true }}
                        options={this._box_options}
                        selectedOptions={this._color_feature}
                        onChange={this.onColorChange}
                        isClearable={false}
                    />

                </EuiPanel>

                <EuiSpacer size="s"/>

                <EuiPanel>
                    <EuiTitle size="xs">
                        <h3>Additional settings</h3>
                    </EuiTitle>

                    <EuiSpacer size="s"/>

                    <EuiCheckbox
                        id={"DebugCheckbox"}
                        label="Debug console output"
                        checked={this._pc.debug}
                        onChange={(e) => this.onToggleChange(e, 'debug')}
                    />
                </EuiPanel>
            </div>
        );
    }
}
