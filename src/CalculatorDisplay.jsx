import React from "react";
import TextField from '@material-ui/core/TextField';

class CalculatorDisplay extends React.Component{
    render() {
        const{
            display,
        } = this.props;

        return(
            <TextField
                id="outlined-basic"
                label="Display"
                variant="outlined"
                value={display}
                inputProps={
                    {readOnly: true}
                }/>
        );
    }
}

export default CalculatorDisplay;