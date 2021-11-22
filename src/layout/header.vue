<template>
  <div style="height:100%">
    <a-menu style="height:5%" v-model="current" mode="horizontal">
      <a-menu-item key="mail" @click="menuChange(0)">
        <a-icon type="mail" />Banner Setting
      </a-menu-item>
      <a-menu-item key="app" @click="menuChange(1)">
        <a-icon type="appstore" />Hospital Setting
      </a-menu-item>
      <!-- <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"
          ><a-icon type="setting" />Navigation Three - Submenu</span
        >
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1">
            Option 1
          </a-menu-item>
          <a-menu-item key="setting:2">
            Option 2
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">
            Option 3
          </a-menu-item>
          <a-menu-item key="setting:4">
            Option 4
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="alipay">
        <a-icon type="appstore" />Navigation Four
      </a-menu-item> -->
    </a-menu>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: ["mail"],
      menu_item: [
        {
          r_name: "banner_set",
          title: "Banner Setting",
        },
        {
          r_name: "hospital_set",
          title: "Hospital Setting",
        },
      ],
    };
  },
  created() {
    this.$router.push({ name: this.menu_item[0].r_name });
  },
  methods: {
    menuChange(key) {
      this.$router.push({ name: this.menu_item[key].r_name });
    },
  },
};
</script>
<style scoped>
.main {
  padding: 30px;
  background-color: #f1f1f1;
  height: 95%;
  overflow-y: scroll;
}
</style>
