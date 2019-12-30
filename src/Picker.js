import React, { Component } from 'react';

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props;
    return (
      <span>
        <h1
          onClick={() => window.open(`https://www.reddit.com/r/${value}`)}
          style={{
            cursor: 'pointer'
          }}
        >
          {value}
        </h1>
        <select onChange={e => onChange(e.target.value)} value={value}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    );
  };
};