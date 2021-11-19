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
      <a-textarea v-model="info.intro" :rows="6" />
    </div>

    <div class="item">
      <span class="span-input">Image</span><br />
      <img style="width:120px;margin:10px 0" :src="info.img_url" /><br />
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
import { add_hospital, edit_hospital } from "@/api/hospital.js";
export default {
  data() {
    return {
      btnTitle: "",
      modalVisible: false,
      confirmLoading: false,
      info: {
        hospital: "",
        tel: "",
        addr: "",
        intro: "",
        image: 652,
        img_url: require("@/assets/seek_hospital.png"),
        rate: 0,
      },
    };
  },
  created() {
    if (this.modalTitle == "Add Hospital Info") {
      this.btnTitle = "+ Add";
    } else {
      this.btnTitle = "Edit";
    }
  },
  components: { ImageModal },
  props: {
    modalTitle: {
      type: String,
      default: "Add Hospital Info",
    },
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    editModal(data) {
      this.modalVisible = true;
      this.info = data;
    },
    onClose() {
      this.modalVisible = false;
    },
    openImageModal() {
      this.$refs.imageModal.showModal();
    },
    get_img_id(img_info) {
      console.log(img_info);
      this.info.image = img_info.id;
      this.info.img_url = img_info.img;
    },
    addHoapital() {
      if (this.btnTitle == "+ Add") {
        add_hospital(this.info)
          .then((res) => {
            if (res.rc == 1) {
              this.$message.success("Add Success");
            }
          })
          .catch((err) => {});
      } else {
        edit_hospital(this.info)
          .then((res) => {
            if (res.rc == 1) {
              this.$message.success("Edit Success");
            }
          })
          .catch((err) => {});
      }
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
