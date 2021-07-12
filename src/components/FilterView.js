import React, {Component} from "react";

class FilterView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '5'
        };
        this.handleSetSize = this.handleSetSize.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSetSize() {
    }

    handleChange(event) {
        this.setState({value: event.target.value}, () => this.props.reloadRanking(this.state.value));

    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="selectSize">Mostrar</label>
                        <select id="selectSize" className="form-select"
                                onChange={this.handleChange} aria-label="size select">
                            <option value="5">Top 5</option>
                            <option value="10">Top 10</option>
                            <option value="-1">Todos</option>
                        </select>
                    </div>
                </div>
            </>
        );
    }
}

export default FilterView;
