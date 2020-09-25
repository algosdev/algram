import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
function ChatRoom({ props }) {
  const msgcont = React.useRef(null);
  const inp = React.useRef(null);
  const el = msgcont && msgcont.current;
  const updateScroll = () => {
    el.scrollTop = el.scrollHeight;
  };
  const [message, setMessage] = React.useState("");
  const auth = props.firebase.auth;
  const firestore = useFirestore();
  useFirestoreConnect([
    {
      collection: "users",
    },
  ]);
  const personalMsg = useSelector((state) => {
    const snapshot = state.firestore.ordered.users;
    const data = snapshot && snapshot.filter((el) => el.id === auth.uid);
    return data;
  });
  const history = useHistory();

  const Allmsg = useSelector((state) => {
    const snapshot = state.firestore.ordered.users;
    const data1 = snapshot && snapshot.map((el) => el.messages);
    const allmsg = [];
    data1 &&
      data1.forEach((el) => {
        el.map((l) => allmsg.push(l));
      });

    return allmsg;
  });
  const SignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };
  console.log(personalMsg);
  const submitHandler = (e) => {
    e.preventDefault();
    inp.current.value = "";
    const oldMessages = personalMsg[0].messages;
    if (message !== "") {
      firestore
        .collection("users")
        .doc(auth.uid)
        .update({
          messages: [
            ...oldMessages,
            {
              text: message,
              author: auth.displayName,
              createdAt: new Date(),
            },
          ],
        });
      setMessage("");
    }
  };
  Allmsg &&
    Allmsg.sort((a, b) => {
      return a.createdAt.seconds - b.createdAt.seconds;
    });
  React.useEffect(() => {
    if (el) {
      updateScroll();
    }
  }, [auth.uid, Allmsg, auth.displayName, el, updateScroll]);
  if (!auth.isEmpty) {
    return (
      <div className="wrapper">
        <div className="top">
          <div className="logo">ALGRAM</div>
          <button className="btn" onClick={SignOut}>
            Log Out
          </button>
        </div>
        <div ref={msgcont} className="container">
          <div className="message-cont">
            {!auth.isEmpty
              ? Allmsg.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        el.author === auth.displayName ? "my" : null
                      } message`}
                    >
                      <fieldset>
                        <legend>{el.author}</legend>
                        {el.text}
                        <span className="time">
                          {moment(el.createdAt.toDate()).calendar()}
                        </span>
                      </fieldset>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="msg">
          <form onSubmit={submitHandler}>
            <textarea
              data-gramm_editor="false"
              rows="1"
              name="text"
              ref={inp}
              placeholder="Type here..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
            <button className="send">
              <svg
                width="28"
                height="28"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5693 4.23706L17.6646 17.9355C17.4453 18.9021 16.874 19.1427 16.0621 18.6876L11.6359 15.4261L9.50057 17.4804C9.26407 17.7169 9.06676 17.9142 8.61095 17.9142L8.92926 13.4069L17.1318 5.995C17.4886 5.67737 17.0541 5.50068 16.5777 5.819L6.43707 12.2045L2.07145 10.8377C1.12201 10.5414 1.10482 9.88831 2.26945 9.4325L19.3449 2.85381C20.1355 2.5575 20.8271 3.02981 20.5693 4.23775V4.23706Z"
                  fill="#333333"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="tologin">
        You haven't signed in
        <Link to="/" className="btn">
          Login
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    props: store,
  };
};
export default connect(mapStateToProps)(ChatRoom);
