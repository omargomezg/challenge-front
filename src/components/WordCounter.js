import React, {Component} from "react";
import {API_URL} from '../constants/Constant';

class WordCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: {}
        }
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleWordRanking = this.handleWordRanking.bind(this);
    }

    componentDidMount() {
        fetch(API_URL + 'word-counter/text')
            .then((response) => response.json())
            .then((data) => {
                this.setState({page: data})
            });
    }

    handleNextPage() {
        const {id, page} = this.state.page;
        fetch(API_URL + 'word-counter/text?' + new URLSearchParams({
            id: id,
            page: page + 1
        }))
            .then((response) => response.json())
            .then((data) => {
                this.setState({page: data})
            });
    }

    handleWordRanking() {

    }

    render() {
        const {page, title, text, total_pages} = this.state.page;
        let nextPageButton;
        if (page !== total_pages) {
            nextPageButton = <div className="text-end">
                <button className="btn btn-light" onClick={this.handleNextPage}>Ver página {page + 1}</button>
            </div>
        }
        return (
            <div>
                <div className="row">
                    <div className="col-sm-8">
                        <h2>{title}</h2>
                    </div>
                    <div className="col-sm-4 text-end">
                        {total_pages} Páginas
                    </div>
                </div>
                <p>{text}</p>
                {nextPageButton}
            </div>
        );
    }
}

export default WordCounter;
