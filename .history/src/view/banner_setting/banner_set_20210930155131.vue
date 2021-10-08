<template>
  <div class="banner-item">
    <img
      src="http://34.92.45.231/wp-content/uploads/2021/09/swiper_img.png"
    ></img>
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
  width: 98%;
  background-color: white;
  box-shadow: 2px 2px 2px lightgrey;
  border-left: 3px solid mediumpurple;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
