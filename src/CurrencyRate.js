import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import axios from 'axios';

class CurrencyRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rates: []
        }
    }
    componentDidMount() {
        axios.get("https://open.exchangerate-api.com/v6/latest")
            .then(response => {
                this.setState({ rates: response.data.rates });
            })
    }
    render() {
        return (
            <div style={{ margin: 10 }}>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Currency Code</th>
                            <th>Currency Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr xs="2" style={{ marginBottom: 50 }}>
                            <td >{Object.keys(this.state.rates).map((rate, i) => {
                                return <div key={i}>{rate}</div>
                            })}</td>
                            <td >{Object.values(this.state.rates).map((rate, i) => {
                                return <div key={i}>{rate}</div>
                            })}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick={() => this.props.history.push("/dashboard")}>Back</Button>
            </div>
        );
    }
}

export default CurrencyRate;
