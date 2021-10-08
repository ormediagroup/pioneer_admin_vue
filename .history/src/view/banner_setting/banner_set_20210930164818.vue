<template>
  <div class="banner-main">
    <h3>Index Page Banner Image Setting</h3>
    <div class="banner-item">
      <a-card
        v-for="(item, index) in banner"
        :key="index"
        hoverable
        style="width: 300px;margin:20px"
      >
        <img slot="cover" alt="example" :src="item.img" />
        <template slot="actions" class="ant-card-actions">
          <a-icon key="edit" type="edit" />
          <a-icon key="delete" type="delete" />
        </template>
        <a-card-meta :title="item.name"></a-card-meta>
      </a-card>
    </div>
    <div>
      <a-button type="primary">
        <a-icon type="plus" />
        Add Image
      </a-button>
    </div>

    <h3>Shop Page Banner Image Setting</h3>
  </div>
</template>

<script>
import { get_banner_img } from "@/api/banner.js";
export default {
  data() {
    return {
      banner: [],
    };
  },
  created() {
    this.getBannerImg();
  },
  methods: {
    getBannerImg() {
      get_banner_img()
        .then((res) => {
          console.log(res.data);
          this.banner = res.data;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-main {
  width: 98%;
  background-color: white;
  box-shadow: 2px 2px 2px lightgrey;
  border-left: 3px solid mediumpurple;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.banner-item {
  display: flex;
  flex-direction: row;
}
</style>
