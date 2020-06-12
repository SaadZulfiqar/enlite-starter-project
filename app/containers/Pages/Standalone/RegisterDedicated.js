import React from 'react';
import Outer from '../../Templates/Outer';
import { Register } from '../../pageListAsync';

class RegisterDedicated extends React.Component {
  render() {
    return (
      <Outer>
        <Register />
      </Outer>
    );
  }
}

export default RegisterDedicated;
