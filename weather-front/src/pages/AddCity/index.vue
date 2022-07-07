<template>
  <div>
    <div>
      <label>
        Назва міста:
        <input type="text" v-model="city.name" />
      </label>
    </div>
    <div>
      <label>
        Власник:
        <select v-model="city.owner">
          <option v-for="user in usersList" :key="user._id" :value="user._id">
            {{ user.name }}
          </option>
        </select>
      </label>
    </div>
    <div>
      <label>
        Фото
        <input type="file" @input="createLogoImage" />
      </label>
      <img id="img" :src="photoSrc" alt="" />
    </div>
    <button @click="onSave">{{ btnLabel }}</button>
    <button @click="getWeather()">Додати місто</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddCityPage",

  data() {
    return {
      APIkey: "c50f88f27a23961fd6f55b0f8a05c4a5",
      cityWeather: "miami",
      city: {},
      rawPhotoData: null,
    };
  },

  computed: {
    ...mapGetters("auth", ["usersList"]),
    photoSrc() {
      return this.rawPhotoData || this.city.photo;
    },
    receivedCityId() {
      return this.$route.params.id;
    },
    btnLabel() {
      return this.receivedCityId ? "Update" : "Add";
    },
  },

  methods: {
    ...mapActions("cities", ["getCityById", "addCity", "updateCity"]),
    ...mapActions("auth", ["loadUsers"]),

    createLogoImage(event) {
      const file = event.target.files[0];
      let reader = new FileReader();
      const self = this;
      reader.onload = (e) => {
        self.rawPhotoData = e.target.result;
        self.city.photo = e.target.result;
        console.log("self.city.photo");
        console.log(self.city.photo);
      };
      reader.readAsDataURL(file);
    },

    async onSave() {
      try {
        if (!this.receivedCityId) await this.addCity(this.city);
        else await this.updateCity(this.city);
        this.$router.push({ name: "cities" });
      } catch (err) {
        console.log(err);
      }
    },

    getWeather() {
      const res = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.cityWeather}&units=metric&appid=${this.APIkey}`
      );
      console.log(res);
    },
  },

  async mounted() {
    if (this.receivedCityId) {
      try {
        this.city = await this.getCityById(this.receivedCityId);
        console.log("this.city");
        console.log(this.city);
      } catch (err) {
        console.log(err);
      }
    }
    this.loadUsers();
  },
};
</script>

<style lang="scss" scoped></style>
