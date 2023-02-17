// import './App.css';
// import Header from './Header';

// function App() {
//   return (
//     <div className="App">
//       <Header/>
//     </div>
//   );
// }
// export default App;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Header from './Header';
import Drawer  from "./Drawer";
import FloatingActionButtons from "./FloatingActionButtons";

function Appp() {
  return (
    <React.StrictMode>
    <div className="App">
      <Drawer/>
    </div>
    </React.StrictMode>
  );
}
export default Appp;

ReactDOM.render(
  
    <Router>
      <App />
    </Router>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();