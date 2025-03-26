<template>
  <div class="archive-container">
    <div class="archive-header">
      <h1 class="archive-title">所有版本存档</h1>
      <router-link to="/" class="back-nav-button">
        <el-icon><ArrowLeft /></el-icon> 返回主导航
      </router-link>
    </div>
    
    <div class="version-groups">
      <!-- 当前版本组 -->
      <div class="version-group">
        <h2 class="group-title">当前版本</h2>
        <div class="version-links">
          <router-link to="/business-flow" class="version-link">
            <div class="version-card">
              <div class="version-name">原始版本</div>
              <div class="version-desc">最新修复后的基础版本</div>
            </div>
          </router-link>
          
          <router-link to="/business-flow-new" class="version-link">
            <div class="version-card">
              <div class="version-name">修复版本</div>
              <div class="version-desc">修复语法错误的版本</div>
            </div>
          </router-link>
          
          <router-link to="/business-flow-improved" class="version-link">
            <div class="version-card">
              <div class="version-name">优化版本</div>
              <div class="version-desc">UI优化后的版本</div>
            </div>
          </router-link>
        </div>
      </div>
      
      <!-- 历史版本组 -->
      <div class="version-group">
        <h2 class="group-title">历史版本</h2>
        <div class="version-links">
          <router-link to="/business-flow-original" class="version-link">
            <div class="version-card">
              <div class="version-name">最初原始版本</div>
              <div class="version-desc">最初未修改的版本</div>
            </div>
          </router-link>
          
          <router-link to="/business-flow-steps" class="version-link">
            <div class="version-card">
              <div class="version-name">步骤展示版本</div>
              <div class="version-desc">展示步骤布局的版本</div>
            </div>
          </router-link>
          
          <router-link to="/compare" class="version-link">
            <div class="version-card">
              <div class="version-name">版本对比</div>
              <div class="version-desc">不同版本对比视图</div>
            </div>
          </router-link>
        </div>
      </div>
      
      <!-- 简化版本组 -->
      <div class="version-group">
        <h2 class="group-title">简化版本</h2>
        <div class="version-links">
          <router-link to="/business-flow-fixed" class="version-link">
            <div class="version-card">
              <div class="version-name">简化修复版</div>
              <div class="version-desc">简化代码结构的修复版本</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeft } from '@element-plus/icons-vue'

export default {
  name: 'VersionArchive',
  components: {
    ArrowLeft
  }
}
</script>

<style scoped>
.archive-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "PingFang SC", "SF Pro SC", "SF Pro Text", "Helvetica Neue", Helvetica, "Microsoft Yahei", Arial, sans-serif;
}

.archive-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.archive-title {
  text-align: left;
  color: #333;
  margin: 0;
  font-size: 28px;
}

.version-groups {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.group-title {
  font-size: 20px;
  color: #409EFF;
  margin-bottom: 16px;
  font-weight: 500;
  padding-bottom: 8px;
  border-bottom: 1px solid #eaeaea;
}

.version-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.version-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 250px;
}

.version-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid #eaeaea;
}

.version-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #b3d8ff;
}

.version-name {
  font-size: 18px;
  color: #303133;
  margin-bottom: 8px;
  font-weight: 500;
}

.version-desc {
  font-size: 14px;
  color: #606266;
}

.back-nav-button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #ecf5ff;
  color: #409EFF;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
}

.back-nav-button:hover {
  background-color: #409EFF;
  color: white;
}
</style> 