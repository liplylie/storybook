import React, { Component } from 'react'
import { SearchEntry } from './SearchEntry'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }
  }

  searchFriends(firstName, lastName) {
    axios.get('/search/' + firstName + lastName)
    .then(({ data }) => {
      this.setState({results: data})
    })
    .catch(err => {
      console.log('failed to search friends', err);
    })
  }
  
  clearSearches() {
    this.setState({results: []})
  }

  render() {
    return (
      <View>
        <SearchBar searchFriends={this.searchFriends.bind(this)} /> 
        {this.state.results.map(result => {
          <SearchEntry img={result.img} name={result.name} /> 
        })}
      </View> 
    )
  }
}

export default Search; 





