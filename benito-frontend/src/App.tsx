import React from 'react';
import { hot } from 'react-hot-loader';
import './styles.scss';

type Props = {}
type State = {}

class App extends React.Component<Props, State> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
    this.state = {};
  }

  render() {
    return (
      <div>
        Hello, world!
      </div>
    );
  }
}

export default hot(module)(App);
