import React from 'react'


export const NotFoundPage = ({ staticContext = {}}) => { //we pass context thru StaticRouter but it comes to us as "stateicContext"

    staticContext.notFound = true;
    return <h1>Oops! Route not found!</h1>
}

export default {
    component: NotFoundPage,
}