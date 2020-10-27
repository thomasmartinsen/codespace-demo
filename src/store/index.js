import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createRootReducer from "../reducers/index";
import thunk from "redux-thunk";


const storeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      name:'Dataplatform Root'
    }) : compose;



export const history = createBrowserHistory()
export function configureStore(preloadedState) {
    const store = createStore(
      createRootReducer(history), // root reducer with router state
      preloadedState,
      compose(
        storeEnhancers(
            applyMiddleware(
                thunk,
                routerMiddleware(history)
            )
        ),
      ),
    )
  
    return store
  }