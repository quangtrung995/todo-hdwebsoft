import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';

const sagaMiddleWare = createSagaMiddleware();
const reduxConfig = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
  sagaMiddleWare.run(rootSaga);
  return store;
};

const stores = reduxConfig();
export default stores;
