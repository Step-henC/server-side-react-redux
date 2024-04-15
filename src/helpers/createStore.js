import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import axios from 'axios';

//creates a store for server side in index.js
//not created in renderer.js because we want to update the store on server BEFORE calling render function
export default(req) => {

    const axiosInstance = axios.create({
        baseURL: 'http://react-ssr-api.herokuapp.com',
        headers: { cookie: req.get('cookie') || ''}
    })

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

    return store;
}
