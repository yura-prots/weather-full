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
            <div class="moon">
              <div></div>
            </div>
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
.moon {
  width: 300px;
  height: 300px;
  position: fixed;
  top: 20%;
  bottom: 70%;
  right: 0%;
  left: 70%;
  margin: auto;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 20px 20px #000 inset, 0 0 20px 2px;
}
.moon::after {
  position: absolute;
  content: "";
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-color: #000;
  border-radius: 50%;
  box-shadow: -40px -40px 50px 2px #000 inset;
}
.moon > div {
  width: 200%;
  height: 100%;
  animation: spin 40s linear alternate infinite;
  background: url(@/assets/images/moon.jpg);
}
@keyframes spin {
  to {
    transform: translate(-50%);
  }
}
</style>