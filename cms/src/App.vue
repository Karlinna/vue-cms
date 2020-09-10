<template>
  <div id="app">
    <div id="demo" :class="[{'collapsed' : collapsed}]">
      <sidebar-menu
        v-if="$store.getters.hasToken"
        :menu="$store.getters.menu"
        :collapsed="collapsed"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick"
      />
      <router-view />
    </div>
  </div>
</template>
<script>
import { SidebarMenu } from "vue-sidebar-menu";

export default {
  name : "App",
  head: {
    title : { inner : "Vue CMS Revision BETA"}
  },
  components: {
    SidebarMenu,
  },
  data() {
    return {
      collapsed : true,
      
    };
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    onItemClick(event, item) {
      item.smth = null;
    },

  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600");
body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}
#demo {
  padding-left: 350px;
}
#demo.collapsed {
  padding-left: 0px;
}
.demo {
  padding: 0px;
}
.container {
  max-width: 900px;
}
pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
</style>
