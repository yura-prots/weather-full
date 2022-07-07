<template>
  <div>
    <h2>Вхід</h2>
    <form @submit.prevent="submit">
      <div>Введіть свої дані:</div>
      <div>
        Ел. адреса:
        <input
          type="text"
          v-model="email"
          name="email"
          placeholder="Ел. адреса"
        />
      </div>
      <div class="form-group">
        Пароль:
        <input
          type="password"
          v-model="password"
          name="password"
          placeholder="Пароль"
        />
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Вхід</button>
        <router-link to="/signup" class="btn btn-link">Реєстрація</router-link>
      </div>
      <div class="form-group error" v-if="message">{{ message }}</div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },

  methods: {
    ...mapActions("auth", ["login", "logout"]),

    async submit() {
      try {
        const user = {
          email: this.email,
          password: this.password,
        };
        const result = await this.login(user);
        if (result === true) {
          this.message = "";
          this.$router.push({ path: "/" });
        }
      } catch (error) {
        this.message = error.response.data.error;
      }
    },
  },

  created() {
    this.logout();
  },
};
</script>

<style lang="scss" scoped>
</style>