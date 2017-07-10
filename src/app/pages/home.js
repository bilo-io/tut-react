import React from 'react';
import Search from '../components/search';
import axios from 'axios';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?`;
        this.searchGoogle = this.searchGoogle.bind(this);
    }
    render() {
        return (
            <div className="panel-container">
                <div className="panel">
                    <Search searchGoogle={this.searchGoogle} />
                    <br />
                    <div className="results">
                        {/*<h4>Results:</h4>*/}
                        <ul>
                            {
                                this.state && this.state.response ?
                                    this.state.response.results.map((result) => {
                                        return <li onClick={(e) => {
                                            console.log(result.formatted_address);
                                        }}>{result.formatted_address}</li>
                                    })
                                    : null
                            }
                        </ul>
                    </div>
                </div>
                <div className="panel" style={{ backgroundColor: 'red' }}>
                    Hello
                </div>
            </div>
        )
    }
    searchGoogle(query) {
        if (query.length == 0) {
            return;
        }
        let url = `${this.googleUrl}address=${query}`;
        console.log({ url });
        axios.request({
            method: 'GET',
            url: url
        }).then((response) => {

            this.setState(Object.assign({}, this.state, {
                response: response.data
            }), () => {
                console.log('Response:', this.state.response);
            })
        }).catch((error) => {
            console.log({ error });
        })
    }
}