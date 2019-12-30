import React, { Component } from 'react';

class Form extends Component {
    state = {
        subreddit: ''
    };

    render() {
        const { addNewSubreddit } = this.props;

        const handleSubmit = (e) => {
            e.preventDefault();
            if (this.state.subreddit) addNewSubreddit(this.state.subreddit);
        };
        return (
            <form onSubmit={handleSubmit}>
                Add more subreddit:
                &nbsp;
                <input
                    type="text"
                    name="subreddit"
                    value={this.state.subreddit}
                    onChange={(e) => this.setState({
                        subreddit: e.target.value
                    })}
                />
                &nbsp;
                <button type="submit">
                    Submit
                </button>
            </form>
        )
    };
};

export default Form;