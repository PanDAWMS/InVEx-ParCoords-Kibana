import { setup as visualizations } from '../../../../src/legacy/core_plugins/visualizations/public/np_ready/public/legacy';
//import { Schemas } from '../../../../src/legacy/ui/public/vis/editors/default/schemas';
//import { setup as visualizations } from 'core_plugins/visualizations/public/np_ready/public/legacy';
import { Schemas } from 'ui/vis/editors/default/schemas';

import { parcoordsEditor } from './parcoords_editor';
import { parcoordsComponent } from './parcoords_components';
import { parcoordsColoring } from './parcoords_coloring';

visualizations.types.createReactVisualization({
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
            debug: false
        },
        clustering_id: null, // null if disabled
    },
  },
  editorConfig: {
    optionTabs: [
      {
        name: 'options',
        title: 'Options',
        editor: parcoordsEditor,
      }, {
        name: 'coloring',
        title: 'Coloring',
        editor: parcoordsColoring,
      },
    ],

    schemas: new Schemas([
        {
            group: 'metrics',
            name: 'metric',
            title: 'Metric',
            min: 2,
            defaults: [
                { type: 'max', schema: 'metric' },
                { type: 'max', schema: 'metric' }
            ]
        },{
            group: 'buckets',
            name: 'segment',
            title: 'Bucket Split',
            min: 1
        }
     ]),
  },

  // requestHandler: myRequestHandler,   //'none',
  // responseHandler: myResponseHandler, //'none',
});