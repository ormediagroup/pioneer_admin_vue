<template>
  <a-modal
    width="800px"
    v-model="visible"
    title="Select Hospital Image"
    :footer="null"
  >
    <div
      style="width:100%;display:flex;flex-direction: row;justify-content:space-between;margin-bottom:20px"
    >
      <a-button type="primary" @click="selectImage">Selected</a-button>
      <a-input-search
        style="width:250px"
        placeholder="input search text"
        enter-button
        v-model="search_key"
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
</template>

<script>
import { get_all_img, search_banner } from "@/api/banner.js";
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
      img_arr: [],
      visible: false,
      search_key: "",
      selectedRowKeys: [],
    };
  },
  created() {
    this.getAllImg();
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    showModal(key) {
      this.search_key = "";
      this.visible = true;
    },
    getAllImg() {
      get_all_img()
        .then((res) => {
          this.img_arr = res.data;
        })
        .catch((error) => {});
    },
    onSearch(value) {
      if (value.trim() == "") {
        this.$message.error("The search key is empty");
        return;
      }
      search_banner(value)
        .then((res) => {
          this.img_arr = res.data;
        })
        .catch((err) => {});
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    selectImage() {
      let data = this.img_arr.filter(
        (item) => item.ID == this.selectedRowKeys[0]
      );
      this.$emit("get_img_id", data[0]);
      this.visible = false;
    },
  },
};
</script>

<style></style>
