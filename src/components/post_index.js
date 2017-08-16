import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchPosts } from '../actions';

class PostIndex extends Component {

  // you could also use componentWillMount() but you would still need to render again when data comes back
  // this will be called ONCE after component first renders
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
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
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
