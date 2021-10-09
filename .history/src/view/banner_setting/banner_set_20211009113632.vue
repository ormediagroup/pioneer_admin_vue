<template>
  <div>
    <div class="banner-main">
      <h3>Index Page Banner Image Setting</h3>
      <div class="banner-item">
        <a-card
          v-for="(item, index) in index_banner"
          :key="index"
          hoverable
          style="width: 300px;margin:20px"
        >
          <img slot="cover" alt="example" :src="item.img" />
          <template slot="actions" class="ant-card-actions">
            <div
              style="width:100px"
              @click="showEditModal(index, item.id, 'index')"
            >
              <a-icon key="edit" type="edit" />
            </div>
            <a-popconfirm
              title="Are you sure delete this task?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirmDelete(index, 'index')"
              @cancel="cancel"
            >
              <div style="width:100px">
                <a-icon key="delete" type="delete" />
              </div>
            </a-popconfirm>
          </template>
          <a-card-meta :title="item.name"></a-card-meta>
        </a-card>
      </div>
      <div>
        <a-button type="primary" @click="showModal('index')">
          <a-icon type="plus" />
          Add Image
        </a-button>
      </div>
    </div>

    <div class="banner-main" style="margin-top:20px">
      <h3>Shop Page Banner Image Setting</h3>
      <div class="banner-item">
        <a-card
          v-for="(item, index) in shop_banner"
          :key="index"
          hoverable
          style="width: 300px;margin:20px"
        >
          <img slot="cover" alt="example" :src="item.img" />
          <template slot="actions" class="ant-card-actions">
            <div
              style="width:100px"
              @click="showEditModal(index, item.id, 'shop')"
            >
              <a-icon key="edit" type="edit" />
            </div>

            <div style="width:100px">
              <a-popconfirm
                title="Are you sure delete this task?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirmDelete(index, 'shop')"
                @cancel="cancel"
              >
                <a-icon key="delete" type="delete" />
              </a-popconfirm>
            </div>
          </template>
          <a-card-meta :title="item.name"></a-card-meta>
        </a-card>
      </div>
      <div>
        <a-button type="primary" @click="showModal('shop')">
          <a-icon type="plus" />
          Add Image
        </a-button>
      </div>
    </div>
    <a-modal width="800px" v-model="visible" :title="modalTitle" :footer="null">
      <div
        style="width:100%;display:flex;flex-direction: row;justify-content:space-between;margin-bottom:20px"
      >
        <a-button
          v-if="modalTitle == 'Add Banner Image'"
          type="primary"
          @click="addImage"
          >Add</a-button
        >
        <a-button
          v-if="modalTitle == 'Edit Banner Image'"
          type="primary"
          @click="editImage"
          >Update</a-button
        >

        <a-input-search
          style="width:250px"
          placeholder="input search text"
          enter-button
          @search="onSearch"
        />
      </div>

      <a-table
        :columns="columns"
        :data-source="img_arr"
        :row-key="(record) => record.ID"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          type: 'radio',
        }"
      >
        <template slot="image" slot-scope="data">
          <div>
            <img :src="data.img" style="height:120px" />
          </div>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import {
  get_banner_img,
  get_all_img,
  set_banner_img,
  search_banner,
} from "@/api/banner.js";
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
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
      index_banner: [],
      shop_banner: [],
      visible: false,
      img_arr: [],
      selectedRowKeys: [],
      key: "",
      modalTitle: "Add Banner Image",
      img_id: 0,
      edit_index: 0,
    };
  },
  created() {
    this.getBannerImg();
    this.getAllImg();
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    getBannerImg() {
      get_banner_img()
        .then((res) => {
          this.index_banner = res.indexBanner;
          this.shop_banner = res.shopBanner;
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
    showModal(key) {
      this.key = key;
      this.visible = true;
    },
    showEditModal(index, img_id, key) {
      this.modalTitle = "Edit Banner Image";
      this.img_id = img_id;
      this.key = key;
      this.edit_index = index;
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    addImage() {
      let data_str = "";
      this.selectedRowKeys.forEach((element) => {
        let data = this.img_arr.filter((item) => item.ID == parseInt(element));
        switch (this.key) {
          case "index":
            this.index_banner.push(data[0]);
            data_str = this.index_banner
              .map(function(obj, index) {
                return obj.id;
              })
              .join(",");
            break;
          case "shop":
            this.shop_banner.push(data[0]);
            data_str = this.shop_banner
              .map(function(obj, index) {
                return obj.id;
              })
              .join(",");
        }
        set_banner_img(this.key, data_str)
          .then((res) => {})
          .catch((err) => {});
        this.visible = false;
        this.selectedRowKeys = [];
      });
    },
    editImage() {
      let data_str = "";
      this.selectedRowKeys.forEach((element) => {
        let data = this.img_arr.filter((item) => item.ID == parseInt(element));
        switch (this.key) {
          case "index":
            this.index_banner[this.edit_index] = data[0];
            data_str = this.index_banner
              .map(function(obj, index) {
                return obj.id;
              })
              .join(",");

            break;
          case "shop":
            this.shop_banner[this.edit_index] = data[0];
            data_str = this.shop_banner
              .map(function(obj, index) {
                return obj.id;
              })
              .join(",");
        }
      });
      set_banner_img(this.key, data_str)
        .then((res) => {})
        .catch((err) => {});
      this.visible = false;
      this.selectedRowKeys = [];
    },
    onSearch() {},
    confirmDelete(index, key) {
      let data_str = "";
      if (key == "index") {
        this.index_banner.splice(index, 1);
        data_str = this.index_banner
          .map(function(obj, index) {
            return obj.id;
          })
          .join(",");
      } else {
        this.shop_banner.splice(index, 1);
        data_str = this.shop_banner
          .map(function(obj, index) {
            return obj.id;
          })
          .join(",");
      }
      set_banner_img(key, data_str)
        .then((res) => {})
        .catch((err) => {});
    },
    cancel(e) {
      console.log(e);
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
