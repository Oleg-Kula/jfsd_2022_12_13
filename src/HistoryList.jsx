import React from "react";

class HistoryList extends React.Component{
    render() {
        const expressions = this.props.history;
        return(
            <ul>
                {expressions.map(expression => <li>{expression}</li>)}
            </ul>

        );
    }
}

export default HistoryList;