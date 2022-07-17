export default {
   cities: {
      readList: `${process.env.VUE_APP_API_URL}/cities`,
      add: `${process.env.VUE_APP_API_URL}/cities`,
      update: `${process.env.VUE_APP_API_URL}/cities`,
      getCityById: (id) => `${process.env.VUE_APP_API_URL}/cities/${id}`,
      delete: `${process.env.VUE_APP_API_URL}/cities`,
   },
   user: {
      usersList: `${process.env.VUE_APP_API_URL}/users`,
      signup: `${process.env.VUE_APP_API_URL}/users/signup`,
      login: `${process.env.VUE_APP_API_URL}/users/login`,
   },
   weather: {
      add: `${process.env.VUE_APP_W_API_URL}/weather`,
      readList: `${process.env.VUE_APP_API_URL}/weather`,
   },
};
