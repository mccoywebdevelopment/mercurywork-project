import React from "react";
import "./Alert.css";

export default class Alert extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
            {this.props.msg.length>0?
            <div className="card error-card">
                Error: {this.props.msg}
            </div>
            :null}
            </>
        )
    }
}