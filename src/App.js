import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
import ChatRoom from "./components/ChatRoom";
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={SignIn} />
        {/* <Route exact path="/signup" component={SignUp} /> */}
        <Route exact path="/chat" component={ChatRoom} />
      </div>
    </Router>
  );
}
export default App;
