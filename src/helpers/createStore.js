import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';

//creates a store for server side in index.js
//not created in renderer.js because we want to update the store on server BEFORE calling render function
export default() => {
    const store = createStore(reducers, {}, applyMiddleware(thunk));

    return store;
}
