import { setup as visualizations } from '../../../../src/legacy/core_plugins/visualizations/public/np_ready/public/legacy';
import { Schemas } from '../../../../src/legacy/ui/public/vis/editors/default/schemas';

import { testvizEditor } from './testviz_editor';
import { testvizComponent } from './testviz_components';

visualizations.types.createReactVisualization({
  name: 'testviz',
  title: 'SefFFAF ASFASFASF',
  icon: 'visControls',
  description:
    'This visualizationASDASDERQ is able to SDKLFJHSDKLJFLKSDJ!!!!! e editor.',
  //responseHandler: 'none',
  visConfig: {
    component: testvizComponent,
    defaults: {
      counter: 0,
    },
  },
  editorConfig: {
    optionTabs: [
      {
        name: 'options',
        title: 'Options',
        editor: testvizEditor,
      },
    ],
    //hierarchicalData

    schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          max: 10,
          defaults: [
            { type: 'max', schema: 'metric' }
          ]
        },{
          group: 'buckets',
          name: 'segment',
          title: 'Bucket Split',
          min: 0,
          max: 10
        }
     ]),
  },
  //requestHandler: 'none',
});