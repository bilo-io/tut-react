import React from 'react'

export default class Search extends React.Component {
    componentWillMount() {
        this.setState({
            searchTerm: ''
        })
    }
    render() {
        return (
            <div>
                <input type="text" placeholder="Search ..." defaultValue={this.state.searchTerm} onChange={ (e) => {
                    this.props.search(e.target.value);
                }} />
            </div>
        )
    }
}