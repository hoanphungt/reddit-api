import React, { Component } from 'react';
import { fetchPostsIfNeeded, selectSubreddit, invalidateSubreddit, addNewSubreedit } from './action';
import { connect } from 'react-redux';
import Picker from './Picker';
import Posts from './Posts';
import { getPostsBySubreddit, getFetchingState, getLastUpdated } from './reducers';
import Form from './Form';
import './App.css';

class App extends Component {
  componentDidMount() {
    const { fetchPostsIfNeeded, selectedSubreddit } = this.props;
    fetchPostsIfNeeded(selectedSubreddit);
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { fetchPostsIfNeeded, selectedSubreddit } = this.props;
      fetchPostsIfNeeded(selectedSubreddit);
    };
  };

  onChange = (nextSubreddit) => {
    this.props.selectSubreddit(nextSubreddit);
    this.props.fetchPostsIfNeeded(nextSubreddit);
  };

  onRefresh = (e) => {
    e.preventDefault();
    const { fetchPostsIfNeeded, selectedSubreddit, invalidateSubreddit } = this.props;
    invalidateSubreddit(selectedSubreddit);
    fetchPostsIfNeeded(selectedSubreddit);
  };

  render() {
    const {
      subreddits,
      selectedSubreddit,
      posts,
      isFetching,
      lastUpdated
    } = this.props;
    
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.onChange}
          options={subreddits}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}{' '}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.onRefresh}>
              Refresh
            </button>
          )}
        </p>
        {isFetching && <h2>Loading ...</h2>}
        {!isFetching && posts.length === 0 && <h2>The list is empty</h2>}
        {posts.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        )}
        <hr/>
        <Form
          addNewSubreddit={this.props.addNewSubreddit}
          selectSubreddit={this.props.selectSubreddit}
        />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  const { subreddits, selectedSubreddit, postsBySubreddit } = state;
  return postsBySubreddit[selectedSubreddit] ? {
    subreddits,
    selectedSubreddit,
    posts: getPostsBySubreddit(postsBySubreddit, selectedSubreddit),
    isFetching: getFetchingState(postsBySubreddit, selectedSubreddit),
    lastUpdated: getLastUpdated(postsBySubreddit, selectedSubreddit),
  } : {
    subreddits,
    selectedSubreddit,
    isFetching: true,
    posts: [],
  };
};

const mapDispatchToProps = (dispatch) => ({
  addNewSubreddit: (subreddit) => dispatch(addNewSubreedit(subreddit)),
  fetchPostsIfNeeded: (subreddit) => dispatch(fetchPostsIfNeeded(subreddit)),
  selectSubreddit: (subreddit) => dispatch(selectSubreddit(subreddit)),
  invalidateSubreddit: (subreddit) => dispatch(invalidateSubreddit(subreddit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);