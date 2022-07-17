<template>
  <div>
    <div>
      <label>
        Назва міста:
        <input type="text" v-model="weather.name" />
      </label>
    </div>
    <div>
      <label>
        Власник:
        <select v-model="weather.owner">
          <option v-for="user in usersList" :key="user._id" :value="user._id">
            {{ user.name }}
          </option>
        </select>
      </label>
    </div>
    <button @click="onSave">{{ btnLabel }}</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "WeatherPage",

  data() {
    return {
      weather: {},
    };
  },

  created() {
    this.onSave();
  },

  computed: {
    ...mapGetters("auth", ["usersList"]),
    receivedCityId() {
      return this.$route.params.id;
    },
    btnLabel() {
      return "Add";
    },
  },

  methods: {
    ...mapActions("auth", ["loadUsers"]),
    ...mapActions("cities", ["addWeatherForCity"]),

    async onSave() {
      await this.addWeatherForCity();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>