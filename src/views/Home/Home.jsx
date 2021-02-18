import React from 'react';
import "./Home.css"

export default class Home extends React.Component{
    state = {
        errorMsg:"",
        question:"",
        punchline:"",
        isLoading:true,
        showPunchline:false
    }
    _toggleShowPunchline = () =>{
        let newState = this.state;
        newState.showPunchline = !newState.showPunchline;
        this.setState(newState);
    }
    _fetchRandomJoke = () =>{
        this.setState({
            ...this.state,
            isLoading:true,
            errorMsg:""
        })
        const requestOptions = {
            method: 'GET',
        };

        fetch("https://official-joke-api.appspot.com/random_joke",requestOptions)
        .then(res => {
            if(res.status >= 400) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(joke => {
            this.setState({
                ...this.state,
                question:joke.setup,
                punchline:joke.punchline,
                isLoading: false
            })
        },
        err => {
            this.setState({
                ...this.state,
                errorMsg:"THERE WAS AN ERROR LOADING YOUR JOKE.",
                isLoading: false
            })
        });
    }
    componentDidMount = () =>{
        this._fetchRandomJoke();
    }
    render(){
        return(
        <>
            <div className="row">
                <div className="col-lg-6">
                    <div className="btn btn-success" onClick={this._fetchRandomJoke}>Get a New Random Joke</div>
                </div>
                <div className="col-lg-6">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/15Dkatz/official_joke_api">View API Docs</a>
                </div>
            </div>
            <hr/>
            {this.state.errorMsg.length>0?
                <p className="red-text">{this.state.errorMsg}</p>
            :this.state.isLoading?
                <p>LOADING YOUR JOKE...</p>
            :
            <>
                <div className="row">
                    <div className="col-lg-12" style={{textAlign:'left'}}>
                        {this.state.question}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <button onClick={this._toggleShowPunchline}className="btn btn-primary">
                            {this.state.showPunchline?
                                "Hide Punchline"
                                :
                                "Show Punchline"
                            }
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{textAlign:'right'}}>
                        {this.state.showPunchline?
                            this.state.punchline
                            :null
                        }
                    </div>
                </div>
            </>
        }
        </>
        )
    }
}