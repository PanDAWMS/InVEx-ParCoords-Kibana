import React, {Fragment} from 'react';

import {EuiPanel, EuiButtonToggle, EuiTitle, EuiSpacer, EuiFlexGrid,
    EuiFlexGroup, EuiFlexItem, EuiIconTip, EuiCheckbox} from '@elastic/eui';
//import { uiModules } from '../../../../src/legacy/ui/public/modules';
//import {uiModules} from 'ui/modules';

//const app = uiModules.get('kibana');

export class parcoordsEditor extends React.Component {
    onCounterChange = ev => {
        this.props.setValue('counter', parseInt(ev.target.value));
    };

    render() {
        let pc = this.props.stateParams.parcoords_params,
            visible = pc.draw.parts_visible;


        this.onToggleChange = (e, component) => {
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

            this.props.setValue('parcoords_params', _pc);

            pc = this.props.stateParams.parcoords_params;
            visible = pc.draw.parts_visible;
        };

        return (
            <div>
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

                    <EuiSpacer/>

                    <EuiButtonToggle
                        label="Table representing the data"
                        iconType={visible.table ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'table')}
                        isSelected={visible.table}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />

                    <EuiSpacer size="m"/>

                    <EuiButtonToggle
                        label="Hint under the graph"
                        iconType={visible.hint ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'hint')}
                        isSelected={visible.hint}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />

                    <EuiSpacer size="m"/>

                    <EuiButtonToggle
                        label="Selector"
                        iconType={visible.selector ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'selector')}
                        isSelected={visible.selector}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />

                    <EuiSpacer size="m"/>

                    <EuiButtonToggle
                        label="Table advanced controls"
                        iconType={visible.table_colvis ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'table_colvis')}
                        isSelected={visible.table_colvis}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />

                    <EuiSpacer size="m"/>

                    <EuiButtonToggle
                        label="Cluster information"
                        iconType={visible.cluster_table ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'cluster_table')}
                        isSelected={visible.cluster_table}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />


                </EuiPanel>

                <EuiSpacer size="s"/>

                <EuiPanel>
                    <EuiTitle size="xs">
                        <h3>Additional settings</h3>
                    </EuiTitle>

                    <EuiSpacer size="s"/>

                    <EuiCheckbox
                        id={"ColorCheckbox"}
                        label="Use second column as a color grade"
                        checked={this.props.stateParams.colors}
                        onChange={(e) => this.onToggleChange(e, 'colors')}
                    />

                    <EuiSpacer size="xs"/>

                    <EuiCheckbox
                        id={"DebugCheckbox"}
                        label="Debug console output"
                        checked={pc.debug}
                        onChange={(e) => this.onToggleChange(e, 'debug')}
                    />
                </EuiPanel>
            </div>
        );
    }
}
