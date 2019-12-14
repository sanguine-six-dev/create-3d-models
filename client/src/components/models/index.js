import React from 'react';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-360';

export default class models extends React.Component {

  componentDidMount() {
    console.log('Getting listings!')
    //found the following code at:  
    //https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://create-3d-demo.herokuapp.com/api/userPortal/fetchListings"; // site that doesn’t send Access-Control-*
    //fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    const testURL = proxyurl + url;
    axios.get(testURL)
    .then(res => {
      //This takes the data from the response, and concatenates it into one array
      var listings = [];
      var separateListingArrays = res.data.map(array => {
          return array.listings.map(items => {
              listings.push(items);
          })
      })

      console.log(listings);
  }).catch(function(e){
      console.log(e);
    })
  }

  render() {
    return (
      <View>Hey!</View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('models', () => models);
