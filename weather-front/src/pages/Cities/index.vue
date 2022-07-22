<template>
  <div>
    <div v-if="isEmpty">Список міст порожній.</div>
    <div v-else>
      <v-carousel hide-delimiters>
        <v-carousel-item v-for="city in cities" :key="city._id" cover>
          <div class="container">
            <!-- <div class="moon">
              <div></div>
            </div>
            <div class="sun">
              <div></div>
            </div> -->
            <div>Назва міста: {{ city.name }}</div>
            <!-- <div>Власник: {{ city.owner && city.owner.name }}</div> -->
            <img :src="city.photo" alt="" />
            <button @click="onDelete(city._id)">Видалити</button>
          </div>
        </v-carousel-item>
      </v-carousel>
      <!-- <div v-for="city in cities" :key="city._id" class="container">
        <div>Назва міста: {{ city.name }}</div>
        <div>Погода: {{ city.currentWeather }}</div>
        <div>Власник: {{ city.owner && city.owner.name }}</div>
        <img :src="city.photo" alt="" />
        <button @click="onDelete(city._id)">Видалити</button>
      </div> -->
      <button @click="addCity()">Додати місто</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CitiesPage",

  computed: {
    ...mapGetters("cities", ["cities"]),

    isEmpty() {
      console.log(this.cities);
      return !this.cities.length;
    },
  },

  methods: {
    ...mapActions("cities", ["loadCities", "deleteCity"]),

    onDelete(id) {
      this.deleteCity(id);
    },
    addCity() {
      this.$router.push({ name: "add-city" });
    },
  },

  mounted() {
    this.loadCities();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  > * {
    margin: 20px;
  }
  img {
    width: 170px;
  }
}

.moon {
  width: 200px;
  height: 200px;
  position: fixed;
  top: 20%;
  right: 0%;
  bottom: 70%;
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
  right: 0;
  bottom: 0;
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

.sun {
  width: 200px;
  height: 200px;
  position: fixed;
  top: 30%;
  right: 0%;
  bottom: 80%;
  left: 30%;
  margin: auto;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 20px 20px orange inset, 0 0 20px 2px;
}
.sun::after {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-color: #000;
  border-radius: 50%;
  // box-shadow: -20px -20px 50px 2px orange inset;
}
.sun > div {
  width: 200%;
  height: 100%;
  animation: spin 40s linear alternate infinite;
  background: url(@/assets/images/sun.jpg);
}
@keyframes spin {
  to {
    transform: translate(-50%);
  }
}
</style>
