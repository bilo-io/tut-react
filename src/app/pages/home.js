import React from 'react';

export default class Home extends React.Component {
    componentWillMount() {
        this.setState(
            { name: 'whoever you are' })
    }
    render() {
        return this.state ? (
                <div>
                    <p>
                        <b>Hello React Devs</b>
                    </p>

                    <p>Now you know how to make a basic React webapp.</p>

                    <p>
                        <input
                            id="name"
                            type="text"
                            placeholder="enter your name"
                            value={this.state.name}
                            onChange={(e) => {
                            this.setState({
                                ...this.state,
                                name: e.target.value
                            }, console.log(this.state));
                        }}/>
                        <button id="hello" onClick={() => alert('Hello ' + this.state.name)}>Say Hello</button>
                        <button id="adios" onClick={() => alert('Adios ' + this.state.name)}>Say Adios</button>
                    </p>
                </div>
            )
            : null;
    }
}