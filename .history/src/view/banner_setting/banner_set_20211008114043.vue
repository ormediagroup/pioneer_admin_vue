<template>
  <div>
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
        <a-button type="primary" @click="showModal">
          <a-icon type="plus" />
          Add Image
        </a-button>
      </div>
    </div>

    <div class="banner-main" style="margin-top:20px">
      <h3>Shop Page Banner Image Setting</h3>
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
    </div>
    <a-modal
      width="1000px"
      v-model="visible"
      title="Basic Modal"
      @ok="handleOk"
    >
      <a-table :columns="columns" :data-source="img_arr" :rowKey="id">
        <template slot="image" slot-scope="data">
          <div>
            <img :src="data.guid" style="height:120px" />
          </div>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import { get_banner_img, get_all_img } from "@/api/banner.js";
const columns = [
  {
    title: "Id",
    dataIndex: "ID",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "post_name",
    key: "name",
  },
  {
    title: "Image",
    key: "image",
    scopedSlots: { customRender: "image" },
  },
];
export default {
  data() {
    return {
      columns,
      banner: [],
      visible: false,
      img_arr: [],
    };
  },
  created() {
    this.getBannerImg();
    this.getAllImg();
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
    getAllImg() {
      get_all_img()
        .then((res) => {
          this.img_arr = res.data;
        })
        .catch((error) => {});
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
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
