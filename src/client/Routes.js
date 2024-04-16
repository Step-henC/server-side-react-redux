//shared with client and server

import React from 'react';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import App from './pages/App';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';


// export default() => {
//     return(
//         <div>
//             <Route exact path="/" component={Home} />
//             <Route exact path="/users" component={UsersList} />

//         </div>
//     )
// }


//we need react-router-config for updating redux state on server side and below is the syntax to impl based on documentation
//In order to update client redux state (api call) to server, we need to config the data the component needs to load based on url
//with this, we are not doing an initial render
//instead, we look at what a given component needs (api call, etc) and then call the resources for render

export default [
   {
        ...App, //component nesting so something is always displayed no matter what
        routes: [
            {
                ...HomePage,
                path: '/',
                exact: true
            }, 
            {
                ...UsersListPage,
                path: '/users',
            
            },
            {
                ...AdminsListPage,
                path: '/admins',
            },
            {
                ...NotFoundPage, //excluding path in object, React will show page if it cannot find match for route   
            },
        ]
   }
]

 
