<template>
  <main-masterpage>
    <v-app>
      <v-content>
        <v-switch
          @click="toggleTheme"
          v-model="model"
          :label="`${this.theme.global.name.value.toString()}`"
        ></v-switch>
        <v-card>
          <v-layout>
            <v-navigation-drawer expand-on-hover rail>
              <v-list density="compact" nav>
                <router-link to="/"
                  ><v-list-item
                    prepend-icon="mdi-view-dashboard"
                    title="Home"
                    value="home"
                  ></v-list-item
                ></router-link>
                <router-link to="/cities"
                  ><v-list-item
                    prepend-icon="mdi-forum"
                    title="cities"
                    value="cities"
                  ></v-list-item
                ></router-link>
                <router-link to="/add-city"
                  ><v-list-item
                    prepend-icon="mdi-forum"
                    title="add-city"
                    value="add-city"
                  ></v-list-item
                ></router-link>
                <router-link to="/login"
                  ><v-list-item
                    prepend-icon="mdi-forum"
                    title="Login"
                    value="login"
                  ></v-list-item
                ></router-link>
                <router-link to="/signup"
                  ><v-list-item
                    prepend-icon="mdi-forum"
                    title="signup"
                    value="signup"
                  ></v-list-item
                ></router-link>
              </v-list>
            </v-navigation-drawer>
            <v-main style="height: 300px"></v-main>
          </v-layout>
        </v-card>
        <router-view></router-view>
      </v-content>
    </v-app>
  </main-masterpage>
</template>

<script>
import MainMasterpage from "@/masterpages/MainMasterpage";
import { useTheme } from "vuetify";

export default {
  name: "App",

  components: {
    MainMasterpage,
  },

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

<style lang="scss">
</style>