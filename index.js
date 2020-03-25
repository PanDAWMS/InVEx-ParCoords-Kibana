import { resolve } from 'path';
import { existsSync } from 'fs';

export default function(kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'invex_parcoords',
    uiExports: {
      styleSheetPaths: [
        resolve(__dirname, 'public/parallel_coordinates/css/*'),
      ].find(p => existsSync(p)),
      visTypes: ['plugins/invex_parcoords/parcoords/parcoords'],
    }
  });
}
