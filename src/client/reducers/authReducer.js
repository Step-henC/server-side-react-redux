import React from "react";
import { FETCH_CURENT_USER } from "../actions";

export default function (state = null, action){
    switch(action.type){
        case FETCH_CURENT_USER:
            return action.payload.data || false;
        default:
            return state;
    }
}