// import { createStore } from 'vuex';
import axios from 'axios';
import apiEndpoints from '@/constants/apiEndpoints';

const store = {
   namespaced: true,
   state: {
      cities: () => [],
      loading: false, //індикатор завантаження
      error: false, //індикатор помилки
   },
   getters: {
      cities: (state) => state.cities,
      isLoading: (state) => state.loading,
      isError: (state) => state.error,
   },
   mutations: {
      setCities(state, cities) {
         state.cities = cities;
      },
      addCityToList(state, city) {
         state.cities.push(city);
      },
      deleteCityFromList(state, cityId) {
         state.cities = state.cities.filter((city) => city._id !== cityId);
      },
      setLoading(state, data) {
         state.loading = data;
      },
      setError(state, data) {
         state.error = data;
      },
   },

   actions: {
      loadCities({ commit }) {
         commit('setLoading', true);
         commit('setError', null);
         //Запит на сервер
         axios
            .get(apiEndpoints.cities.readList) //Асинхронна дія
            .then(
               //Якщо добре
               (res) => res.data
            )
            .then((resData) => {
               if (resData.success) commit('setCities', resData.data);
               else throw new Error('Fetch failed!');
            })
            .catch((err) => {
               //Якщо погано
               commit('setError', err);
            })
            .finally(
               //Завжди
               () => commit('setLoading', false)
            );
      },

      addCity({ commit }, city) {
         commit('setLoading', true);
         commit('setError', null);

         return new Promise((resolve, reject) => {
            axios
               .post(apiEndpoints.cities.add, city)
               .then(
                  //Якщо добре
                  (res) => res.data
               )
               .then((resData) => {
                  if (resData.success) resolve(true);
                  else throw new Error('Fetch failed!');
               })
               .catch((err) => {
                  //Якщо погано
                  commit('setError', err);
                  reject(err);
               })
               .finally(
                  //Завжди
                  () => commit('setLoading', false)
               );
         });
      },

      updateCity({ commit }, city) {
         commit('setLoading', true);
         commit('setError', null);
         return new Promise((resolve, reject) => {
            axios
               .put(apiEndpoints.cities.update, city)
               .then(
                  //Якщо добре
                  (res) => res.data
               )
               .then((resData) => {
                  if (resData.success) resolve(true);
                  else throw new Error('Fetch failed!');
               })
               .catch((err) => {
                  //Якщо погано
                  commit('setError', err);
                  reject(err);
               })
               .finally(
                  //Завжди
                  () => commit('setLoading', false)
               );
         });
      },

      getCityById({ commit }, id) {
         commit('setLoading', true);
         commit('setError', null);
         return new Promise((resolve, reject) => {
            axios
               .get(apiEndpoints.cities.getCityById(id))
               .then(
                  //Якщо добре
                  (res) => res.data
               )
               .then((resData) => {
                  if (resData.success) resolve(resData.data);
                  else throw new Error('Fetch failed!');
               })
               .catch((err) => {
                  //Якщо погано
                  commit('setError', err);
                  reject(err);
               })
               .finally(
                  //Завжди
                  () => commit('setLoading', false)
               );
         });
      },

      deleteCity({ commit }, id) {
         commit('setLoading', true);
         commit('setError', null);
         new Promise((resolve, reject) => {
            axios
               .delete(apiEndpoints.cities.delete, { data: { id } })
               .then(
                  //Якщо добре
                  (res) => res.data
               )
               .then((resData) => {
                  console.log('-resData');
                  console.log(resData);
                  if (resData.success) {
                     commit('deleteCityFromList', id);
                     resolve(true);
                  } else throw new Error('Delete failed!');
               })
               .catch((err) => {
                  //Якщо погано
                  commit('setError', err);
                  reject(err);
               })
               .finally(
                  //Завжди
                  () => commit('setLoading', false)
               );
         });
      },
   },
};

export default store;
