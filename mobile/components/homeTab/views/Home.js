import React, { Component } from 'react';
import { SearchBar, List, ListItem } from 'react-native-elements'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView, 
  Header,
} from 'react-native';
import Collection from './Collection';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';

import axios from 'axios'

//import Login from '../../auth/Login.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title:{
    flexDirection: 'column',
    margin: 10
  },
  image: {
    width: 200,
    height: 30,
    // margin: 2,
    // marginTop: 10,
  },
  header: { 
    height: 70,
    backgroundColor: 'white'
  }, 
  collection: {
    backgroundColor: 'skyblue',
    flex:1,
  },
  spinnerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner:{
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: []
    }
  }
  static navigationOptions = {
    // headerTitleStyle: { color: '#fff' },
    // header: (props) => <ImageHeader {...props} />
    headerTitle: <Image resizeMethod='resize'
    resizeMode='contain' style={styles.image} source={require('../../../logo.jpg')}/>,
    headerStyle: styles.header, 
  }

  searchUsers(input) {
    axios.get('http://localhost:5000/' + 'api/get_user_name?name=' + input)
    .then(({ data }) => {
      this.setState({results: [...this.state.results, data]}, () => {
        console.log('this is the state ', this.state.results)
      })
    })
    .catch(err => {
      console.log('error searching users', err);
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.results.length > 0) {
      return (
        <View>
          <SearchBar
            placeholder="Search"
            lightTheme
            round
            onChangeText={(text) => {
              if (text === '') {
                this.setState({results: []});
              }
              this.setState({input: text});
            }}
            onSubmitEditing={() => {
              this.searchUsers(this.state.input);
            }}
            clearIcon={{ color: '#86939e', name: 'clear' }}
          /> 
          <List>
          {this.state.results.map((result) => {
                return (
                  <ListItem 
                    roundAvatar
                    avatar={{uri: result.profile_image_url}}
                    title={result.name}
                    onPress={() => {
                      navigate('FriendProfile', {friendId: result.id, name: result.name, type: 'result'});
                    }}>
                  </ListItem>
                )
          })}
          </List>
        </View> 
      )
    } else if (this.props.profileInfo.userLocation) {
      console.log(this.props, 'home props')
      let location = this.props.profileInfo.userLocation;
      let navigation = this.props.navigation
      return (
          <View style={{flex:1}}>
            <SearchBar
                placeholder="Search"
                lightTheme
                round
                onChangeText={(text) => {
                  if (text === '') {
                    this.setState({results: []});
                  }
                  this.setState({input: text});
                }}
                onSubmitEditing={() => {
                  this.searchUsers(this.state.input);
                }}
                clearIcon={	{ color: '#86939e', name: 'clear' } }
            />
          <View style={styles.container}>
            <View style={styles.collection}>
              <Collection location={location} navigation={navigation}/>
           </View>
        </View>
       </View>
      );
    } else {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner type='FadingCircle' style={styles.spinner}/>
        </View>
      )
    }
  }
}

const mapStateToProps = (store) =>{
  console.log(store, 'home store')
  return {
    profileInfo: store.Profile,
    friends: store.Chat.friends
  }
}


export default connect(mapStateToProps, null)(Home)