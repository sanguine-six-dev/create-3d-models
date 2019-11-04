import React from 'react';

import MyListing from './components/MyListing';
import ViewListing from './components/ViewListing'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        //filterText: '',
        selectedListing: 0,
        //data: this.props
        };
    }

    selectedUpdate(id) {
        this.setState({
          selectedListing: id
        })
      }

    render () {

        return (
          
            
        );
    }
}

export default App;