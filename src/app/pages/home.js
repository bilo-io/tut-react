import React from 'react';
import Search from '../components/search';
import Map from '../components/map';
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
                    <Search search={this.searchGoogle} />
                    <br />
                    <div className="results">
                        <ul>
                            {
                                this.state && this.state.response ?
                                    this.state.response.results.map((result, idx) => {
                                        result.address_components = [];
                                        return <li key={idx} onClick={(e) => {
                                            this.setState(Object.assign({}, this.state, {
                                                googleResult: result,
                                                response: undefined
                                            }))
                                        }}>{result.formatted_address}</li>
                                    })
                                    : null
                            }
                        </ul>
                    </div>
                    {
                        this.state && this.state.googleResult ?
                            <textarea style={{padding: '1rem', width: 'calc(100% - 2rem)', height: '88%'}} onChange={ () => {}} value={JSON.stringify(this.state.googleResult, false, 2)}></textarea>
                            : null
                    }
                </div>
                <div className="panel" style={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                    <Map />
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