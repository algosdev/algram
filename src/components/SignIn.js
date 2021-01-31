import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import 'firebase/auth';
function SignIn({ props }) {
  const [isLogged, setLog] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const auth = props.firebase.auth;
  const submitHandler = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error);
      });
  };
  React.useEffect(() => {
    if (auth.uid) {
      setLog(true);
    }
  }, [auth.uid, isLogged]);
  if (isLogged) {
    return <Redirect to='/chat' />;
  } else {
    return (
      <div className='login'>
        <h2>Sign In</h2>
        <form onSubmit={submitHandler}>
          <div>
            <input
              type='text'
              placeholder='Email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              autoComplete
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button>Login</button>
          </div>
          {/* <div className="link">
            <span>Do not have account?</span>
            <Link to="/signup">Sign up</Link>
          </div>  */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    props: store,
  };
};
export default connect(mapStateToProps)(SignIn);
