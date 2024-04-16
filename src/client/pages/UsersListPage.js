import React, {Component} from 'react'
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {
    componentDidMount(){
        this.props.fetchUsers();
    }

    renderUsers(){
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>
        })
    }

    head(){
        return (
            <Helmet>
            <title>{`${this.props.users.length} Users Loaded`}</title>
            <meta property="og:title" content="Users App" />
        </Helmet>
        )
    }
    //helmet optimizes SEO by injecting header tags into our HTML template
    render(){
        return (
            <div>
                {this.head()}
               
                Here's a big list of Users:
                <ul>{this.renderUsers()}</ul>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {users: state.users};
}

//update redux store on server side and only load components once data received
function loadData(store){//store comes from index.js 
   return  store.dispatch(fetchUsers()); //accept server redux store as paramaeter and dispatch for api call, retrn a promis
   //load page once promise resolved
}


export default {
    loadData,
    component: connect(mapStateToProps, {fetchUsers})(UsersList)
}