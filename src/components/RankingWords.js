import React, {Component, Fragment} from "react";
import {API_URL} from "../constants/Constant";
import FilterView from "./FilterView";

class RankingWords extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            page: props.page,
            words: [],
            size: 5
        }
        this.handleGetRanking = this.handleGetRanking.bind(this);
        this.reloadRanking = this.reloadRanking.bind(this);
    }

    componentDidMount() {
        this.handleGetRanking(5);
    }

    reloadRanking(value) {
        this.setState({size: value});
        this.handleGetRanking(value);
    }

    handleGetRanking(size) {
        const {id, page} = this.state;
        fetch(API_URL + 'word-counter/text/most-common?' + new URLSearchParams({
            id: id,
            page: page,
            size: size
        }))
            .then((response) => response.json())
            .then((data) => {
                this.setState({words: data})
            });
    }

    render() {
        const words = this.state.words.sort((a, b) => b.match - a.match).map((word, index) =>
            <Fragment key={index}>
                    <dt className="col-sm-3">{word.word}</dt>
                    <dd className="col-sm-9">{word.match}</dd>
            </Fragment>);
        return (
            <div>
                {this.state.words.length > 0 && <FilterView reloadRanking={this.reloadRanking}/>}
                <dl className="row">
                    {words}
                </dl>
            </div>
        );
    }
}

export default RankingWords;
