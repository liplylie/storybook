import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import Collection from './Collection';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';


//import Login from '../../auth/Login.js'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: []
    }
  }
  static navigationOptions = {
    header: null
  }

  searchUsers(input) {
    //axios.get
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.results.length) {
      return (
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={(text) => {
              if (text === '') {
                this.setState({results: []});
              }
              this.setState({input: text});
            }}
            onSubmitEditing={() => {
              this.searchFriends(this.state.input);
            }}
            clearIcon={	{ color: '#86939e', name: 'clear' } }
          /> 
          <List>
          {this.state.results.map((result) => {
            for (let i = 0; this.props.friends.length; i++) {
              if (result.id === friends[i].id) {
                return (
                  <ListItem 
                    roundAvatar
                    avatar={{uri: result.img}}
                    title={result.name}
                    onPress={() => {
                      navigate('FriendProfile', {userId: result.id, type: 'friend'});
                    }}>
                  </ListItem>
                )
              } else {
                return (
                  <ListItem 
                    roundAvatar
                    avatar={{uri: result.img}}
                    title={result.name}
                    onPress={() => {
                      navigate('FriendProfile', {userId: result.id, type: 'result'});
                    }}>
                  </ListItem>
                )
              }
            }})
          })}
          </List>
          }}
        </View> 
      )
    } else if (this.props.profileInfo.userLocation) {
      console.log(this.props, 'home props')
      let location = this.props.profileInfo.userLocation;
      let navigation = this.props.navigation
      return (
          <View style={styles.container}>
             <SearchBar
                placeholder="Search"
                onChangeText={(text) => {
                  if (text === '') {
                    this.setState({results: []});
                  }
                  this.setState({input: text});
                }}
                onSubmitEditing={() => {
                  this.searchFriends(this.state.input);
                }}
                clearIcon={	{ color: '#86939e', name: 'clear' } }
             //add icon to clear searches
            /> 
            <View style={styles.title}> 
              <Image 
                style={styles.image}
                resizeMethod='resize'
                resizeMode='contain'
                source={require('../../../logo.jpg')} 
              />
            </View>
            <View style={styles.collection}>
              <Collection location={location} navigation={navigation}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title:{
    flexDirection: 'column',
    margin: 10
  },
  image: {
    width: 250,
    height: 50,
    margin: 2
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

const mapStateToProps = (store) =>{
  console.log(store, 'home store')
  return {
    profileInfo: store.Profile,
    friends: store.Chat.friends
  }
}


export default connect(mapStateToProps, null)(Home)