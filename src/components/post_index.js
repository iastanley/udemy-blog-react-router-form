import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render(){
    return (
      <div>Post Index</div>
    );
  }
}

//no mapStateToProps needed here
//everything coming from network request

//passing action creator as second arg to connect
//the same as creating mapDispatchToProps function
export default connect(null, { fetchPosts })(PostIndex);
