import fetch from 'cross-fetch';

// TYPES
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

// ACTIONS
export const fetchPosts = (subreddit) => (dispatch) => {
    dispatch({
        type: REQUEST_POSTS,
        subreddit
    });
    return fetch(`https://www.reddit.com/r/${subreddit}.json`).then(
        response => response.json()
    ).then(
        body => dispatch({
            type: RECEIVE_POSTS,
            subreddit,
            posts: body.data.children.map(child => child.data),
            receivedAt: Date.now()
        })
    ).catch(e => console.log(e))
};

export const shouldFetchPosts = (state, subreddit) => {
    const posts = state.postsBySubreddit[subreddit];
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    };
};

export const fetchPostsIfNeeded = (subreddit) => (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
        return dispatch(fetchPosts(subreddit));
    };
};