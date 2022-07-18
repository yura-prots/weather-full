<template>
  <v-app>
    <v-content>
      <v-switch
        @click="toggleTheme"
        v-model="model"
        :label="`${this.theme.global.name.value.toString()}`"
      ></v-switch>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { useTheme } from "vuetify";

export default {
  name: "App",

  data() {
    return {
      model: true,
    };
  },

  setup() {
    const theme = useTheme();
    return {
      theme,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? "light"
          : "dark"),
    };
  },
};
</script>
