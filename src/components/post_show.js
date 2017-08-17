import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOnePost, deletePost } from '../actions';

class PostShow extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchOnePost(id);
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (<h3>Loading...</h3>);
    }

    return (
      <div className="post-show">
        <Link to="/">Back to Index Page</Link>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
        <div>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick}>
            Delete Post
          </button>
        </div>

      </div>
    );
  }
}

// ownProps === this.props
// using this trick so that we can refer to this.props.post in component
const mapStateToProps = ({ posts }, ownProps) => {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  {fetchOnePost, deletePost}
)(PostShow);
