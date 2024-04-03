<template>
  <div class="flex flex-col items-center w-full gap-4 mt-10 mb-10">
    <Clock />
    <Date />
  </div>
  <draggable v-model="cities" element="div" tag="div" item-key="tz" @end="writeLocalStorage()">
    <template #item="{ element: city }" :key="city.tz">
      <div>
        <Timezone :location="city.location" :timezone="city.tz" @contextmenu="removeCity(city.location)"/>
      </div>
    </template>
  </draggable>
  <div
    class="absolute left-0 flex justify-center w-full pb-4 bottom-20"
  >
    <div
      class="flex items-center justify-center w-24 h-24 rounded-full cursor-pointer bg-cblue-400 text-cblue-800"
      @click="toggleBelowDiv"
    >
      <svg-icon type="mdi" :path="mdiPlus"></svg-icon>
    </div>
  </div>
  <div
    class="absolute top-0 left-0 z-20 w-full h-full bg-cblue-800"
    v-show="showBelowDiv"
  >
    <div
      class="w-full flex items-center px-4 pb-6 border-b-[1px] border-ctext-400 mt-14"
    >
      <svg-icon
        type="mdi"
        size="28"
        :path="mdiArrowLeft"
        @click="toggleBelowDiv"
      ></svg-icon>
      <div class="ml-4 text-lg font-light">
        <input
          v-model="search"
          type="text"
          class="w-full py-2 bg-transparent text-ctext-100 placeholder:text-ctext-300"
          placeholder="Search for a city"
        />
      </div>
    </div>
    <div class="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full font-light pointer-events-none text-ctext-400" v-show="search.length <= 1">
      <svg-icon
        type="mdi"
        size="128"
        :path="mdiMagnify"
      ></svg-icon>
      Search for a city
    </div>
    <div class="font-light text-ctext-200">
      <div
        v-for="(city, index) in cityLookup"
        :key="'item' + index"
        class="flex justify-between py-5 pl-12 pr-10 hover:bg-cblue-700"
        @click="addNewCity(city.city, city.timezone)"
      >
        {{ city.city }}
        <span class="text-ctext-300">{{
          new Date().toLocaleTimeString("en-US", {
            timeZone: city.timezone,
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus, mdiArrowLeft, mdiMagnify } from "@mdi/js";
import cityTimezones from "city-timezones";
import draggable from 'vuedraggable'

export default {
  name: "my-component",
  components: {
    SvgIcon,
    draggable
  },
  data() {
    return {
      mdiPlus: mdiPlus,
      mdiArrowLeft: mdiArrowLeft,
      mdiMagnify: mdiMagnify,
      showBelowDiv: false,
      cityLookup: [],
      search: "",
      cities: [
        {
          location: "Chicago",
          tz: "America/Chicago",
        },
        {
          location: "New York",
          tz: "America/New_York",
        },
      ],
    };
  },
  mounted() {
    const savedList = localStorage.getItem("worldClocks");
    if (savedList) {
      this.cities = JSON.parse(savedList);
    } else {
      localStorage.setItem("worldClocks", JSON.stringify(this.cities));
    }
  },
  methods: {
    toggleBelowDiv() {
      console.log( this.showBelowDiv);
      this.showBelowDiv = !this.showBelowDiv;
    },
    addNewCity(city, timezone) {
      this.cities.push({ location: city, tz: timezone });
      this.showBelowDiv = false;
      this.search = "";
      this.writeLocalStorage();
    },
    removeCity(city) {
      this.cities = this.cities.filter((c) => c.location !== city);
      this.writeLocalStorage();
    },
    writeLocalStorage() {
      localStorage.setItem("worldClocks", JSON.stringify(this.cities));
    },
  },
  watch: {
    search() {
      if (this.search.length < 2) {
        this.cityLookup = [];
      } else {
        this.cityLookup = cityTimezones
          .findFromCityStateProvince(this.search)
          .filter(item => item.timezone !== null)
          .slice(0, 10);
        // console.log( this.search, this.search.length,  this.cityLookup)
        return this.search;
      }
    },
  },
};
</script>
