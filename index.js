import { resolve } from 'path';
import { existsSync } from 'fs';

export default function(kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'test_3',
    uiExports: {
      /*app: {
        title: 'Test 3',
        description: 'ASDasdkjflsd',
        main: 'plugins/test_3/app',
      },
      hacks: ['plugins/test_3/hack'],*/
      styleSheetPaths: [
        resolve(__dirname, 'public/parallel_coordinates/css/*'),
        //resolve(__dirname, 'public/app.css'),
      ].find(p => existsSync(p)),
      visTypes: ['plugins/test_3/testviz/testviz'],
    }
  });
}
