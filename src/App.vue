<template>
  <div id="app">
    <div class="version-nav" v-if="showVersionNav && !isArchivePage">
      <router-link to="/business-flow">原始版本</router-link>
      <router-link to="/business-flow-new">修复版本</router-link>
      <router-link to="/business-flow-improved">优化版本</router-link>
      <router-link to="/archive" class="archive-link">版本存档</router-link>
      <button @click="hideNav" class="close-nav">×</button>
    </div>
    <button v-else-if="!showVersionNav && !isArchivePage" @click="showNav" class="show-nav">显示导航</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showVersionNav: true
    }
  },
  computed: {
    isArchivePage() {
      return this.$route.path === '/archive'
    }
  },
  methods: {
    hideNav() {
      this.showVersionNav = false
    },
    showNav() {
      this.showVersionNav = true
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: "PingFang SC", "SF Pro SC", "SF Pro Text", "Helvetica Neue", Helvetica, "Microsoft Yahei", Arial, sans-serif;
}

#app {
  font-family: "PingFang SC", "SF Pro SC", "SF Pro Text", "Helvetica Neue", Helvetica, "Microsoft Yahei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.version-nav {
  background-color: #f0f9ff;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #d9ecff;
  position: relative;
  z-index: 1000;
}

.version-nav a {
  color: #409EFF;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
}

.version-nav a:hover {
  background-color: #ecf5ff;
}

.version-nav a.router-link-active {
  background-color: #409EFF;
  color: white;
}

.archive-link {
  margin-left: auto;
  background-color: #f0f2f5;
  border: 1px dashed #409EFF;
}

.close-nav, .show-nav {
  margin-left: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #409EFF;
  padding: 4px 8px;
}

.close-nav:hover, .show-nav:hover {
  color: #66b1ff;
}

.show-nav {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background-color: #f0f9ff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style> 