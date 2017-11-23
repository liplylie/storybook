import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as commentActions from '../../../actions/commentActions'
import CommentV from './Comment.js'

class CommentView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false
    }
  }

  componentDidMount() {
    this.props.actions.getComments(this.props.imageId);
  }

  render() {
    const { comments } = this.props;
    const { showAll } = this.props;
    
    return (
      <View>
        {comments.map((comment, i) => (
          <CommentV key={i} comment={comment} />
        ))}
      </View>
    )
  }
}

const commentState = (state) => {
  return {
    posting: state.Comment.posting,
    retrieving: state.Comment.retrieving,
    comments: state.Comment.comments
  }
}

const commentDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  }
}

export default connect(commentState, commentDispatch)(CommentView);