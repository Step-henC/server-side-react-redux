import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

//hocs directory is for higher order component
export default (ChildComponent) => {
    class RequireAuth extends Component {
        render(){
            switch(this.props.auth){ //produced by auth reducer
                case false:
                    return <Redirect to="/" /> //redirect does nothing on server, must use context on StaticRouter
                case null:
                    return <div>Loading...</div>
                default:
                    return <ChildComponent {...this.props} /> //if signed in, we are good
            }
        }
    }

    function mapStateToProps({auth}){
        return { auth };
    }
    return connect(mapStateToProps)(RequireAuth)
}