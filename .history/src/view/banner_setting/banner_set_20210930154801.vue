<template>
  <div class="banner-item">
    banner
  </div>
</template>

<script>
import { get_banner_img } from "@/api/banner.js";
export default {
  data() {
    return {};
  },
  created() {
    this.getBannerImg();
  },
  methods: {
    getBannerImg() {
      get_banner_img()
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-item {
  width: 95%;
  border-left: 2px solid mediumpurple;
  background-color: white;
  height: 100px;
}</style
>>
