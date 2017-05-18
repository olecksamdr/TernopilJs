import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Accounts from './Accounts.js';


// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <Accounts.ui.LoginForm
        onSignedInHook={ () => console.log('user signed in') }
      />
    );
  }
}
