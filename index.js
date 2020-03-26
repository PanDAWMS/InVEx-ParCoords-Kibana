import { resolve } from 'path';
import { existsSync } from 'fs';

export default function(kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'invex-parcoords',
    uiExports: {
      visTypes: ['plugins/invex-parcoords/parcoords/parcoords'],
    }
  });
}
