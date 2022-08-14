import React, { useState, useRef, useEffect, useCallback } from "react";
import restaurants from "../services/restaurants";

export default function Checkbox ({categories, restaurants}) {
    const [state, setState] = useState({
        result:restaurants,
        filters: []
    });

    const handleFilterChange = useCallback(event => {
        setState(prevState => {
            let filters = prevState.filters;
            let products = restaurants;

            if(eve)
        })
    })

}