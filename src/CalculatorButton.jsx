import React from "react";
import Button from '@material-ui/core/Button';

class CalculatorButton extends React.Component{
    render() {
        const {
            buttonValue,
        } = this.props;

        return(
            <Button value={buttonValue} onClick={this.props.onClick}>
                {buttonValue}
            </Button>
        );
    }
}

export default CalculatorButton;