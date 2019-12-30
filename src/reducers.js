import { combineReducers } from 'redux';
import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS, ADD_NEW_SUBREDDIT } from './action';

const subreddits = (state = ['reactjs', 'frontend', 'soccer', 'realmadrid'], action) => {
    switch (action.type) {
        case ADD_NEW_SUBREDDIT:
            return [
                ...state,
                action.subreddit
            ];
        default:
            return state;
    };
};

const selectedSubreddit = (state = 'reactjs', action) => {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    };
};

const posts = (
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) => {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    };
};

const postsBySubreddit = (state = {}, action) => {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            });
        default:
            return state;
    };
};

// SELECTORS
export const getPostsBySubreddit = (postsBySubreddit, subreddit) => {
    return postsBySubreddit[subreddit].items;
};

export const getFetchingState = (postsBySubreddit, subreddit) => {
    return postsBySubreddit[subreddit].isFetching;
};

export const getLastUpdated = (postsBySubreddit, subreddit) => {
    return postsBySubreddit[subreddit].lastUpdated;
};

const rootReducer = combineReducers({
    subreddits,
    postsBySubreddit,
    selectedSubreddit
});

export default rootReducer;