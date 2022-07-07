import { createStore } from 'vuex';
import auth from './auth';
import cities from './cities';

const store = createStore({
   modules: {
      auth,
      cities,
   },
});

export default store;
