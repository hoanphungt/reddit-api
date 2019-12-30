import React, { Component } from 'react';

class Form extends Component {
    state = {
        subreddit: ''
    };

    render() {
        const { addNewSubreddit, selectSubreddit } = this.props;
        const { subreddit } = this.state;

        const handleSubmit = (e) => {
            e.preventDefault();
            if (subreddit) {
                addNewSubreddit(subreddit);
                selectSubreddit(subreddit);
            };
        };
        return (
            <form onSubmit={handleSubmit}>
                Add more subreddit:
                &nbsp;
                <input
                    type="text"
                    name="subreddit"
                    value={subreddit}
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