<template>
  <div style="height:100%">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="mail">
        <a-icon type="mail" />Banner Setting
      </a-menu-item>
      <a-menu-item key="app">
        <a-icon type="appstore" />Navigation Two
      </a-menu-item>
      <a-sub-menu>
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
        <a href="https://antdv.com" target="_blank" rel="noopener noreferrer"
          >Navigation Four - Link</a
        >
      </a-menu-item>
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
      ],
    };
  },
  created() {
    this.$router.push({ name: this.menu_item[0].r_name });
  },
};
</script>
<style scoped>
.main {
  padding: 30px;
  background-color: #f1f1f1;
  height: 95%;
}
</style>
