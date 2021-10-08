<template>
  <div class="banner-main">
    <a-card hoverable style="width: 300px">
      <img
        slot="cover"
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <template slot="actions" class="ant-card-actions">
        <a-icon key="edit" type="edit" />
        <a-icon key="delete" type="delete" />
      </template>
      <a-card-meta
        title="Banner Image 1"
        description="This is the description"
      ></a-card-meta>
    </a-card>
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
