import React, { Component } from 'react';

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) => (
          <li key={i}>
            <a
              href={`https://www.reddit.com${post.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    );
  };
};