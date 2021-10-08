<template>
  <div class="banner-item">
    <a-list item-layout="horizontal" :data-source="banner">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions">edit</a>
        <a slot="actions">more</a>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <a slot="title" href="https://www.antdv.com/">{{ item.name }}</a>
          <img
            src="http://34.92.45.231/wp-content/uploads/2021/09/swiper_img.png"
            height="100px"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
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
