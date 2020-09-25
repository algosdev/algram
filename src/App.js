import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
// import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useFirestoreConnect } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatRoom from "./components/ChatRoom";
function App({ props }) {
  const firestore = useFirestore();
  useFirestoreConnect([
    {
      collection: "users",
    },
  ]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hasSignedIn = props.firebase.auth.uid ? true : false;
  const auth = props.firebase.auth;
  const LoginHandler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword("asdasdas@asdas.asda", "dasdwaeadsdasdw")
      .catch((error) => {
        alert(error);
      });
  };
  // console.log(users);
  const Signout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const SignUpHandler = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log(auth.uid);
        if (email !== "" && password !== "" && auth.uid !== undefined) {
          firestore
            .collection("users")
            .doc(auth.uid)
            .set({
              email: email,
              password: password,
              country: [{ country: "AQSH" }],
            });
        }
      })
      .catch(function (error) {});
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  // const users = useSelector((state) => {
  //   const snapshot = state.firestore.ordered.users;
  //   const data = snapshot && snapshot.filter((el) => el.id === auth.uid);
  //   return data;
  // });
  useEffect(() => {});
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/chat" component={ChatRoom} />
      </div>
    </Router>
  );
}

const mapStateToProps = (store) => {
  return {
    props: store,
  };
};
// const enhance = connect(
//   // Map redux state to component props
//   ({ firebase: { auth, profile } }) => ({
//     auth,
//     profile,
//   })
// );

export default connect(mapStateToProps)(App);
