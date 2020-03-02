import React from 'react';

import { EuiFieldNumber, EuiFormRow } from '@elastic/eui';

export class parcoordsEditor extends React.Component {
  onCounterChange = ev => {
    this.props.setValue('counter', parseInt(ev.target.value));
  };

  render() {

    return (
      <EuiFormRow label="Counter">
        <EuiFieldNumber
          value={this.props.stateParams.counter}
          onChange={this.onCounterChange}
          step={1}
          data-test-subj="counterEditor"
        />
      </EuiFormRow>
    );
  }
}
