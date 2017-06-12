import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchPosts } from '../actions';

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // we can't use normal array map method because this.props.posts is an
    // object
    return _.map(this.props.posts, post => {
      return (
          <li className="list-group-item" key={post.id}>
            {post.title}
          </li>
      );
    });
  }

  render(){
    console.log(this.renderPosts());
    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

//passing action creator as second arg to connect
//the same as creating mapDispatchToProps function
export default connect(mapStateToProps, { fetchPosts })(PostIndex);
