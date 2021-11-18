<template>
  <a-drawer
    width="600px"
    :title="modalTitle"
    :visible="modalVisible"
    @close="onClose"
  >
    <div class="item">
      <span class="span-input">Hospital</span>
      <a-input v-model="info.hospital" />
    </div>

    <div class="item">
      <span class="span-input">Tel</span>
      <a-input v-model="info.tel" />
    </div>

    <div class="item">
      <span class="span-input">Address</span>
      <a-input v-model="info.addr" />
    </div>

    <div class="item">
      <span class="span-input">Introduction</span>
      <a-input v-model="info.intro" />
    </div>

    <div class="item">
      <span class="span-input">Image</span><br />
      <img style="width:120px;margin:10px 0" :src="url" /><br />
      <a-button type="default" @click="openImageModal"
        >Change Hospital Img</a-button
      >
    </div>
    <a-button type="primary" style="float:right" @click="addHoapital">{{
      btnTitle
    }}</a-button>
    <ImageModal ref="imageModal" @get_img_id="get_img_id" />
  </a-drawer>
</template>

<script>
import ImageModal from "@/components/imageModal.vue";
import { add_hospital } from "@/api/hospital.js";
export default {
  data() {
    return {
      modalTitle: "Add Hospital Info",
      btnTitle: "+ Add",
      modalVisible: false,
      confirmLoading: false,
      info: {
        hospital: "",
        tel: "",
        addr: "",
        intro: "",
        img: 652,
        rate: 0,
      },
      url: "http://34.92.45.231/wp-content/uploads/2021/11/seek_hospital.png",
    };
  },
  created() {},
  components: { ImageModal },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    onClose() {
      this.modalVisible = false;
    },
    openImageModal() {
      this.$refs.imageModal.showModal();
    },
    get_img_id(img_info) {
      console.log(img_info);
      this.info.img = img_info.id;
      this.url = img_info.img;
    },
    addHoapital() {
      add_hospital(this.info)
        .then((res) => {
          if (res.rc == 1) {
            this.$message.success("Add Success");
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scope>
.item {
  margin: 10px 0;
  .span-input {
    width: 180px;
  }
}
</style>
