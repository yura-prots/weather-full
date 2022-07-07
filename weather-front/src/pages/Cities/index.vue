<template>
  <div>
    <div v-if="isEmpty">Список міст порожній.</div>
    <div v-else>
      <div v-for="city in cities" :key="city._id" class="container">
        <div>Назва міста: {{ city.name }}</div>
        <div>Погода: {{ city.currentWeather }}</div>
        <div>Власник: {{ city.owner && city.owner.name }}</div>
        <img :src="city.photo" alt="" />
        <button @click="onDelete(city._id)">Видалити</button>
      </div>
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
    width: 70px;
  }
}
</style>
