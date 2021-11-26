import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk'

const sagaMiddleWare = createSagaMiddleware();
const middleWares = [sagaMiddleWare, thunk] 
const reduxConfig = () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));
  sagaMiddleWare.run(rootSaga);
  return store;
};

const stores = reduxConfig();
export default stores;
