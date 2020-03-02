import { setup as visualizations } from '../../../../src/legacy/core_plugins/visualizations/public/np_ready/public/legacy';
import { Schemas } from '../../../../src/legacy/ui/public/vis/editors/default/schemas';

import { parcoordsEditor } from './parcoords_editor';
import { parcoordsComponent } from './parcoords_components';

visualizations.types.createReactVisualization({
  name: 'parcoords',
  title: 'Parallel Coordinates',
  icon: 'advancedSettingsApp',
  description:
    'This visualization contains parallel coordinates diagram with a table connected to it.',

  visConfig: {
    component: parcoordsComponent,
    defaults: {
      counter: 0,
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
            min: 1,
            defaults: [
            { type: 'max', schema: 'metric' }
            ]
        },{
            group: 'buckets',
            name: 'segment',
            title: 'Bucket Split'
        }
     ]),
  },

  // requestHandler: myRequestHandler,   //'none',
  // responseHandler: myResponseHandler, //'none',
});