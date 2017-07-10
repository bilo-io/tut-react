import React from 'react'

export default class Search extends React.Component {
    componentWillMount() {
        this.setState({
            searchTerm: '',
            searching: false,
            response: undefined
        })
    }
    render() {
        return (
            <div>
                <input type="text" defaultValue={this.state.searchTerm} onChange={ (e) => {
                    this.props.searchGoogle(e.target.value);
                }} />
            </div>
        )
    }
}