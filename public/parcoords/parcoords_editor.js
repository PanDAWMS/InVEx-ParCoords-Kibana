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

            if (component == 'debug') _pc.debug = !_pc.debug;
            else _pc.draw.parts_visible[component] = !_pc.draw.parts_visible[component];

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
                                <h3>Hide graph parts</h3>
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
                        label="Table"
                        iconType={visible.table ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'table')}
                        isSelected={visible.table}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />

                    <EuiSpacer size="m"/>

                    <EuiButtonToggle
                        label="Hint"
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
                        label="Table controls"
                        iconType={visible.table_colvis ? 'eye' : 'eyeClosed'}
                        onChange={(e) => this.onToggleChange(e, 'table_colvis')}
                        isSelected={visible.table_colvis}
                        size="s"
                        isEmpty
                        //isIconOnly
                    />


                </EuiPanel>

                <EuiSpacer size="s"/>

                <EuiPanel>
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
