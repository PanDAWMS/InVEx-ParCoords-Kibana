/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { KibanaContextProvider } from '../../../src/plugins/kibana_react/public';
import { DefaultEditorSize } from '../../../src/plugins/vis_default_editor/public';
import { DataPublicPluginSetup } from '../../../src/plugins/data/public';
import { ExprVis, VisParams } from '../../../src/plugins/visualizations/public';
import { CustomFormFilterAccountsVisWrapper } from './custom_form_filter_accounts_vis_controller';
import { CustomFormFilterAccountsOptions } from './custom_form_filter_accounts_options';
import { CustomFormFilterAccountsVisDependencies } from './plugin';
import { icon } from './custom_form_filter_icon';

import {Schemas} from '../../../src/plugins/vis_default_editor/public';

import {parcoordsEditor} from './parcoords_editor';
import {parcoordsComponent} from './parcoords_components';

export interface CustomFormFilterAccountsVisComponentProp {
  vis: ExprVis;
  data: DataPublicPluginSetup;
  visParams: VisParams;
}

export function getCustomFormFilterAccountsVisDefinition(dependencies: CustomFormFilterAccountsVisDependencies) {

  return {
    name: 'parcoords',
    title: 'Parallel Coordinates',
    icon: 'advancedSettingsApp',
    description:
        'This visualization contains parallel coordinates diagram with a table connected to it.',

    visConfig: {
        component: parcoordsComponent,
        defaults: {
            parcoords_params: {
                draw: {
                    framework: 'd3',
                    mode: 'print',
                    parts_visible: {
                        table: true,
                        cluster_table: true,
                        hint: false,
                        selector: false,
                        table_colvis: false
                    },
                },
                skip: {
                    dims: {
                        mode: 'none'
                    }
                },
                worker: {
                    enabled: false,
                    offscreen: false
                },
                debug: false,
            },
            colors: false,
        },
    },
    editorConfig: {
        optionTabs: [
            {
                name: 'options',
                title: 'Options',
                editor: parcoordsEditor,
            },
        ],

        schemas: new Schemas([
            {
                group: 'metrics',
                name: 'metric',
                title: 'Metric',
                min: 2,
                defaults: [
                    {type: 'max', schema: 'metric'},
                    {type: 'max', schema: 'metric'}
                ]
            }, {
                group: 'buckets',
                name: 'segment',
                title: 'Bucket Split',
                min: 1
            }
        ]),
    }
  };
}
