// import React from 'react';
// import { Redirect, Link } from 'react-router-dom';
// import firebase from 'firebase/app';
// import { connect } from 'react-redux';
// import { useFirestore } from 'react-redux-firebase';
// import 'firebase/auth';
// function SignUp({ props }) {
//   const [isLogged, setLog] = React.useState(false);
//   const [name, setName] = React.useState(null);
//   const [email, setEmail] = React.useState(null);
//   const [password, setPassword] = React.useState(null);
//   const auth = props.firebase.auth;
//   const firestore = useFirestore();
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (name && email && password) {
//       firebase
//         .auth()
//         .createUserWithEmailAndPassword(email, password)
//         .then((doc) => {
//           if (firebase.auth().currentUser != null) {
//             firebase.auth().currentUser.updateProfile({
//               displayName: name,
//             });
//           }
//           firestore.collection('users').doc(doc.user.uid).set({
//             email: email,
//             name: name,
//             messages: [],
//             createdAt: new Date(),
//           });
//         })
//         .catch((err) => {
//           alert(err.message);
//         });
//     } else {
//       alert('Fill in all inputs!');
//     }
//   };

//   React.useEffect(() => {
//     if (auth.uid) {
//       setLog(true);
//     }
//   }, [auth.uid]);
//   if (isLogged) {
//     return <Redirect to='/chat' />;
//   } else {
//     return (
//       <div className='login'>
//         <h2>Sign Up</h2>
//         <form onSubmit={submitHandler}>
//           <div>
//             <input
//               type='text'
//               placeholder='Name'
//               onChange={(e) => {
//                 setName(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <input
//               type='text'
//               placeholder='Email'
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <input
//               type='password'
//               placeholder='Password'
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <button>Sign up</button>
//           </div>
//         </form>
//         <div className='link'>
//           <span>Already have account?</span>
//           <Link to='/'>Sign in</Link>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (store) => {
//   return {
//     props: store,
//   };
// };
// export default connect(mapStateToProps)(SignUp);
