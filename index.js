import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link } from 'react-router'

import data from './data'

const Home = React.createClass({
    render: function () {
        return (
            <div className="page">
                Home page
                <TagCloud/>
            </div>
        );
    }
});

const TagInfo = React.createClass({

    render: function () {

        let tagFilter = data.filter(function (value) {
            return value.id === this.props.params.itemId;
        }.bind(this));

        let tag = tagFilter[0];

        //Total mentions
        let totalMentions = 0;
        for (let i in tag.sentiment) {
            totalMentions += tag.sentiment[i]
        }

        //Page type
        let pageTypes = Object.keys(tag.pageType).map((item, index) => {
            return <li key={index}>
                <span>{item}: {tag.pageType[item]}</span>
            </li>;
        });

        return (
            <div className="page">
                <Link className="button" to="/">Back to Home</Link>
                <div className="tag-info-lines">
                    <div><b>Label:</b> {tag.label}</div>
                    <div><b>Total Mentions:</b> {totalMentions}</div>
                    <div><b>Positive Mentions:</b> {tag.sentiment.positive ? tag.sentiment.positive : 0 }</div>
                    <div><b>Neutral Mentions:</b> {tag.sentiment.neutral ? tag.sentiment.neutral : 0 }</div>
                    <div><b>Negative Mentions:</b> {tag.sentiment.negative ? tag.sentiment.negative : 0}</div>
                    <div><b>List of page types:</b>
                        <ul>
                            {pageTypes}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

const TagCloud = React.createClass({
    render: function () {
        let tags = Object.keys(data).map((item, index) => {
            return <Tag key={index} data={data[item]} text={data[item]['label']}/>;
        });

        return (
            <div className="tag-cloud">
                {tags}
            </div>
        );
    }
});

const Tag = React.createClass({

    render: function () {
        const MAX_SCORE_SIZE = 4; // max size 4vm

        let style = {
            fontSize: ((this.props.data.sentimentScore * MAX_SCORE_SIZE) / 100) + 'vw'
        };

        return (
            <Link className="tag" style={style} to={'/' + this.props.data.id}>
                {this.props.text}
            </Link>
        );
    }
});

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={Home}/>
        <Route path='/:itemId' component={TagInfo} />
    </Router>,
    document.getElementById('wrapper')
);