<template>
  <div class="banner-main">
    <a-button type="primary" @click="openModal('add')">+ Add</a-button>
    <a-table
      style="width:98%;margin-top:20px;"
      :columns="columns"
      :data-source="tableData"
      :rowKey="(record) => record.id"
      :scroll="{ x: true }"
    >
      <template slot="image" slot-scope="data">
        <div>
          <img :src="data.img_url" style="height:100px" />
        </div>
      </template>
      <template slot="action" slot-scope="data">
        <div>
          <a-icon theme="twoTone" type="edit" @click="editHospital(data)" />
          <a-icon theme="twoTone" type="delete" />
        </div>
      </template>
    </a-table>
    <AddHospital ref="hospitalModal" />
    <EditHospital ref="editHospitalInfo" :modalTitle="'Edit Hospital Info'" />
  </div>
</template>

<script>
import { get_all_hospital, del_hospital } from "@/api/hospital.js";
import AddHospital from "./add_hospital.vue";
import EditHospital from "./add_hospital.vue";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "Hospital",
    dataIndex: "hospital",
    key: "hospital",
    width: 200,
  },
  {
    title: "Hospital Image",
    key: "img_url",
    scopedSlots: { customRender: "image" },
    width: 120,
  },
  {
    title: "Tel",
    dataIndex: "tel",
    key: "tel",
    width: 200,
  },
  {
    title: "Address",
    dataIndex: "addr",
    key: "addr",
    width: 200,
  },
  {
    title: "Introduction",
    dataIndex: "intro",
    key: "intro",
    width: 700,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];
export default {
  data() {
    return {
      columns,
      tableData: [],
      search_key: "",
      visible: false,
    };
  },
  created() {
    this.getAllHospital();
  },
  components: { AddHospital, EditHospital },
  methods: {
    getAllHospital() {
      get_all_hospital()
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          this.getAllHospital();
        });
    },
    openModal(key) {
      this.$refs.hospitalModal.showModal();
    },
    editHospital(data) {
      this.$refs.editHospitalInfo.editModal(data);
    },
    delHospital(data) {
      del_hospital(data)
        .then((res) => {
          if (res.rc == 1) {
            this.$message.success("Delete Success");
            this.getAllHospital();
          } else {
            this.$message.error("Delete Fail");
          }
        })
        .catch((err) => {});
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
</style>
