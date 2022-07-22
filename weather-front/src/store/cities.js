// import { createStore } from 'vuex';
import axios from 'axios';
import apiEndpoints from '@/constants/apiEndpoints';

const store = {
   namespaced: true,
   state: {
      cities: () => {},
      cityWeather: {},
      loading: false, //індикатор завантаження
      error: false, //індикатор помилки
   },
   getters: {
      cities: (state) => state.cities,
      cityWeather: (state) => state.cityWeather,
      isLoading: (state) => state.loading,
      isError: (state) => state.error,
   },
   mutations: {
      setCities(state, cities) {
         state.cities = cities;
      },
      addWeather(state, weather) {
         state.cityWeather = weather;
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

      addWeatherForCity({ commit }) {
         commit('setLoading', true);
         commit('setError', null);
         axios
            .get(apiEndpoints.weather.add)
            .then(
               //Якщо добре
               (res) => res.data
            )
            .then((resData) => {
               if (resData.success) commit('addWeather', resData.data);
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
