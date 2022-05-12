import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Path from "./routes";

export default function Main(){

    return (
        <Router>
            <Path />
        </Router>
    )

}