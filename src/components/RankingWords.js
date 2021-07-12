import React, {Component} from "react";
import {API_URL} from "../constants/Constant";

class RankingWords extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            page: props.page,
            words: []
        }
        this.handleGetRanking = this.handleGetRanking.bind(this);
    }

    componentDidMount() {
        this.handleGetRanking();
    }

    handleGetRanking() {
        const {id, page} = this.state;
        fetch(API_URL + 'word-counter/text/most-common?' + new URLSearchParams({
            id: id,
            page: page
        }))
            .then((response) => response.json())
            .then((data) => {
                this.setState({words: data})
            });
    }

    render() {
        const words = this.state.words.sort((a, b) => b.match - a.match).map(word =>
                <>
                    <dt className="col-sm-3">{word.word}</dt>
                <dd className="col-sm-9">{word.match}</dd>
                </>);
        return (
            <div>
                <dl className="row">
                    {words}
                </dl>
            </div>
        );
    }
}

export default RankingWords;
