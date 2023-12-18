//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';


//include your index.scss file into the bundle
//import "../styles/index.css";

//import your own components
import Layout from "./layout";

import Ai from "./pages/ai.jsx"
import Models from "./pages/models.jsx";
import Model1 from "./pages/model1.jsx";

//render your react application
//ReactDOM.render(<Layout />, document.querySelector("#app"));
//ReactDOM.render(<Ai/>, document.querySelector("#app"));
//ReactDOM.render(<Models/>, document.querySelector("#app"));
ReactDOM.render(<Model1/>, document.querySelector("#app"));
