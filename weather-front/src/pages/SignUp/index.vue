<template>
  <div>
    <h2>Реєстрація</h2>
    <form @submit.prevent="submit">
      <div>Введіть свої дані:</div>
      <div>
        Ім`я:
        <input type="text" v-model="name" name="name" placeholder="Ім`я" />
      </div>
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
      <div v-if="message">{{ message }}</div>
      <div>
        <button type="submit">Реєстрація</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignUpPage",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: "",
    };
  },

  methods: {
    ...mapActions("auth", ["signup", "logout"]),

    async submit() {
      try {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        console.log(user);
        const result = await this.signup(user);
        if (result === true) {
          this.message = "";
          this.$router.push({ path: "/login", query: { signedup: "true" } });
        } else {
          this.message = result;
        }
      } catch (error) {
        this.message = error.message;
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