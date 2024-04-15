
export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {//api is an axiosInstance
    const res = await api.get('/users'); //add /xss at the end to test XSS

    dispatch({
        type: FETCH_USERS,
        payload: res
    })
}


export const FETCH_CURENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {

    const res = await api.get('/current_user');

    dispatch({
        type: FETCH_CURENT_USER,
        payload: res
    })
}