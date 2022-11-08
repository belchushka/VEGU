import {
  ActionCreator,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  alertReducer,
  authReducer, blockReducer, courseReducer, moduleReducer, userReducer,
} from "@box/entities";

const combinedReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  course: courseReducer,
  course_block: blockReducer,
  block_module: moduleReducer,
  alert: alertReducer
});

const rootReducer = (
  state: ReturnType<typeof combinedReducers>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducers(state, action);
};

export const store = configureStore({
  // @ts-ignore
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, AppState, undefined, AnyAction>
>;

const makeStore: MakeStore<AppStore> = () => store;

export const wrapper = createWrapper(makeStore);
