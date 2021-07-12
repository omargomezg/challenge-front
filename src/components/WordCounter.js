import React, {Component} from "react";
import {API_URL} from '../constants/Constant';
import RankingWords from "./RankingWords";

class WordCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: {
                id: '',
                page: 0,
                text: '',
                title: '',
                total_pages: 0
            },
            loading: true
        }
        this.handleNextPage = this.handleNextPage.bind(this);
    }

    componentDidMount() {
        fetch(API_URL + 'word-counter/text')
            .then((response) => response.json())
            .then((data) => {
                this.setState({page: data, loading: false})
            });
    }

    handleNextPage() {
        this.setState({loading: true}, () => {
            const {id, page} = this.state.page;
            fetch(API_URL + 'word-counter/text?' + new URLSearchParams({
                id: id,
                page: page + 1
            }))
                .then((response) => response.json())
                .then((data) => {
                    this.setState({page: data, loading: false});
                });
        });

    }

    render() {
        const {page, title, text, total_pages} = this.state.page;
        let nextPageButton;
        if (page !== total_pages) {
            nextPageButton = <div className="text-end">
                <button className="btn btn-light" onClick={this.handleNextPage}>Ver página {page + 1} de {total_pages}</button>
            </div>
        }
        return (
            <div>
                <div className="row">
                    <div className="col-sm-8">
                        <h2>{title}</h2>
                    </div>
                    <div className="col-sm-4 text-end">
                        Página {page}
                    </div>
                </div>
                <p>{text}</p>
                {nextPageButton}
                {this.state.page.page > 0 && !this.state.loading &&
                <RankingWords id={this.state.page.id} page={this.state.page.page}/>
                }
            </div>
        );
    }
}

export default WordCounter;
