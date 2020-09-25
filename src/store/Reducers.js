import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const initState = {
  name1: null,
  name2: null,
  percentage: null,
  resultText: null,
  progress: 0,
};

function localReducer(state = initState, action) {
  switch (action.type) {
    case "SHOW":
      return {
        name1: action.name1,
        name2: action.name2,
        percentage: action.percentage,
        resultText: action.txt,
        progress: 2,
      };
    case "CALCULATING":
      return {
        ...state,
        progress: 1,
      };
    case "RESET":
      return initState;
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  localReducer: localReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
export default rootReducer;
