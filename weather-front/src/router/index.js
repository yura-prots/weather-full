import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import CitiesPage from '../pages/Cities';
import AddCityPage from '../pages/AddCity';

const routes = [
   { path: '/', component: HomePage, name: 'home' },
   { path: '/login', component: LoginPage, name: 'login' },
   { path: '/signup', component: SignUpPage, name: 'signup' },
   { path: '/cities', component: CitiesPage, name: 'cities' },
   { path: '/add-city/:id?', component: AddCityPage, name: 'add-city' },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;
