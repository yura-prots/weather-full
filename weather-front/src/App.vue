<template>
  <main-masterpage>
    <template #header>
      <router-link to="/">Home</router-link>
      <router-link to="/cities">Список міст</router-link>
      <router-link to="/add-city">Додати місто</router-link>

      <router-link v-if="!isAuthenticated()" to="/signup">
        <strong>Sign up</strong>
      </router-link>
      <router-link v-if="!isAuthenticated()" to="/login">
        <strong>Log in</strong>
      </router-link>
      <button v-if="isAuthenticated()" @click="onLogout">Log out</button>
    </template>
    <router-view></router-view>
  </main-masterpage>
</template>

<script>
import MainMasterpage from "@/masterpages/MainMasterpage";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    MainMasterpage,
  },

  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },

  methods: {
    ...mapActions("auth", ["logout"]),
    onLogout() {
      this.logout();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
