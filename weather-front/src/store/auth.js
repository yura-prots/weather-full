import axios from 'axios';
import apiEndpoints from '../constants/apiEndpoints';

const store = {
   namespaced: true,

   state: {
      usersList: () => [],
      authData: JSON.parse(localStorage.getItem('authData')) || null,
      expiresAt: localStorage.getItem('expiresAt') || null,
      loading: false,
      error: false,
   },

   mutations: {
      setUsersList(state, usersList) {
         state.usersList = usersList;
      },

      setLoading(state, data) {
         state.loading = data;
      },
      setError(state, data) {
         state.error = data;
      },

      setAuthData(state, { authData, expiresAt }) {
         state.authData = { ...authData };
         state.expiresAt =
            expiresAt ||
            state.authData.expires_in * 1000 + new Date().getTime();
         localStorage.setItem('authData', JSON.stringify(state.authData));
         localStorage.setItem('expiresAt', JSON.stringify(state.expiresAt));
      },

      clearAuthData(state) {
         state.authData = null;
         state.expiresAt = null;
         localStorage.removeItem('authData');
         localStorage.removeItem('expiresAt');
      },
   },

   actions: {
      setAuthData({ commit }, { authData, expiresAt }) {
         commit('setAuthData', { authData, expiresAt });
      },

      signup({ commit }, { name, email, password }) {
         return new Promise((resolve, reject) => {
            axios
               .post(apiEndpoints.user.signup, { name, email, password })
               .then(() => {
                  resolve(true);
               })
               .catch((err) => {
                  commit('clearAuthData');
                  reject(err);
               });
         });
      },

      login({ commit }, { email, password }) {
         return new Promise((resolve, reject) => {
            axios
               .post(apiEndpoints.user.login, { email, password })
               .then((res) => res.data)
               .then((data) => {
                  commit('setAuthData', { ...data.user });
                  resolve(true);
               })
               .catch((err) => {
                  commit('clearAuthData');
                  reject(err);
               });
         });
      },

      logout({ commit }) {
         commit('clearAuthData');
      },

      loadUsers({ commit }) {
         commit('setLoading', true);
         commit('setError', null);
         new Promise((resolve, reject) => {
            axios
               .get(apiEndpoints.user.usersList)
               .then((res) => res.data)
               .then((resData) => {
                  commit('setUsersList', resData.data);
                  resolve(true);
               })
               .catch((err) => {
                  commit('clearAuthData');
                  reject(err);
               });
         });
      },
   },

   getters: {
      usersList: (state) => state.usersList,
      isLoading: (state) => state.loading,
      isError: (state) => state.error,

      isAuthenticated: (state) => () => {
         return state.authData && new Date().getTime() < state.expiresAt;
      },

      getAccessToken: (state) => () => {
         return state.authData && state.authData.access_token;
      },

      authorized: (state) =>
         state.authData && new Date().getTime() < state.expiresAt,
   },
};

export default store;
