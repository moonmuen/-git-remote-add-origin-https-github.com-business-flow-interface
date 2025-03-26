<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <header class="main-header">
      <div class="logo">脑建立</div>
      <div class="header-right">
        <el-button plain size="small" class="management-btn"><el-icon><setting /></el-icon> 后台管理</el-button>
        <div class="user-info">
          <el-avatar size="small" class="user-avatar">林</el-avatar>
          <span class="user-name">林浩鹏</span>
        </div>
      </div>
    </header>

    <div class="main-container">
      <!-- 左侧菜单 -->
      <div class="sidebar">
        <el-menu default-active="4-4" class="sidebar-menu">
          <el-menu-item index="1">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Folder /></el-icon>
              <span>数据对象管理</span>
            </template>
            <el-menu-item index="2-1">价值流建模</el-menu-item>
            <el-menu-item index="2-2">业务流建模</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Tools /></el-icon>
              <span>过程数字化工具</span>
            </template>
            <el-menu-item index="3-1">过程框架</el-menu-item>
            <el-menu-item index="3-2">业务流建模</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="4" :open="true">
            <template #title>
              <el-icon><Monitor /></el-icon>
              <span>应用开发工具</span>
            </template>
            <el-menu-item index="4-1">视图管理</el-menu-item>
            <el-menu-item index="4-2">表单管理</el-menu-item>
            <el-menu-item index="4-3">审核流管理</el-menu-item>
            <el-menu-item index="4-4" class="active-menu">执行业务流管理</el-menu-item>
            <el-menu-item index="4-5">应用管理</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="5">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统配置</span>
            </template>
            <el-menu-item index="5-1">系统设置</el-menu-item>
            <el-menu-item index="5-2">用户管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>

      <!-- 主内容区域 -->
      <div class="main-content">
        <!-- 整体容器 - 将搜索区域和表格放在同一个白色容器中 -->
        <div class="combined-content-container">
          <!-- 创建按钮调整到左边 -->
          <div class="create-button-row">
            <el-button type="primary" @click="handleCreateFlow" class="normal-create-btn">创建</el-button>
          </div>
          
          <!-- 表格内容 -->
          <div class="table-container">
            <el-table 
              :data="tableData" 
              border
              style="width: 100%"
              :header-cell-style="{ backgroundColor: '#f5f7fa' }"
            >
              <el-table-column type="selection" width="55" />
              
              <el-table-column prop="name" label="价值流名称" min-width="180" />
              
              <el-table-column prop="type" label="模型状态" width="100">
                <template #default="scope">
                  <div class="status-cell">
                    <span 
                      class="status-dot" 
                      :class="{
                        'status-active': scope.row.status === 'active',
                        'status-draft': scope.row.status === 'draft',
                        'status-deprecated': scope.row.status === 'deprecated',
                        'status-inprogress': scope.row.status === 'inProgress'
                      }"
                    ></span>
                    <span class="status-text">{{ scope.row.statusName }}</span>
                  </div>
                </template>
              </el-table-column>
              
              <el-table-column prop="owner" label="归属人" width="150" />
              
              <el-table-column prop="createTime" label="创建时间" width="180" />
              
              <el-table-column prop="updateTime" label="更新时间" width="180" />
              
              <el-table-column label="操作" width="240" fixed="right">
                <template #default="scope">
                  <div class="operation-btns">
                    <el-button type="primary" text @click="handleEdit(scope.row)" class="op-btn">编辑</el-button>
                    <el-button type="primary" text @click="handleConfig(scope.row)" class="op-btn">设置</el-button>
                    <el-dropdown trigger="click" @command="(command) => handleCommand(command, scope.row)">
                      <el-button text class="op-btn">
                        更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item command="publish">发布</el-dropdown-item>
                          <el-dropdown-item command="copy">复制</el-dropdown-item>
                          <el-dropdown-item command="export">导出</el-dropdown-item>
                          <el-dropdown-item command="delete" divided>
                            <span style="color: #f56c6c;">删除</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  HomeFilled, 
  Folder, 
  Tools, 
  Monitor, 
  Setting,
  ArrowDown
} from '@element-plus/icons-vue'

// 简化的假数据
const tableData = ref([
  {
    id: '1',
    name: '从机会到回款',
    status: 'active',
    statusName: '已发布',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  },
  {
    id: '2',
    name: '从机会到回款',
    status: 'draft',
    statusName: '未发布',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  },
  {
    id: '3',
    name: '从机会到回款',
    status: 'deprecated',
    statusName: '已下线',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  }
])

// 简化的方法
const handleCreateFlow = () => {
  console.log('创建流程')
}

const handleEdit = (row) => {
  console.log('编辑', row)
}

const handleConfig = (row) => {
  console.log('设置', row)
}

const handleCommand = (command, row) => {
  console.log(command, row)
}
</script>

<style>
/* 本地样式，覆盖全局样式 */
.app-container {
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

.logo {
  color: #333333;
  font-size: 18px;
  font-family: "PingFang SC", "SF Pro SC", "SF Pro Text", "Helvetica Neue", Helvetica, "Microsoft Yahei", Arial, sans-serif;
  font-weight: normal;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.management-btn {
  height: 32px;
  font-size: 14px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-size: 14px;
  color: #333;
}

.user-avatar {
  background-color: #409EFF;
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  overflow-y: auto;
}

.sidebar-menu {
  border-right: none;
}

.active-menu {
  background-color: #ecf5ff;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
  overflow-y: auto;
}

/* 合并容器 */
.combined-content-container {
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

/* 创建按钮放在左边 */
.create-button-row {
  display: flex;
  justify-content: flex-start;
  margin: 16px 0 0 16px;
}

.normal-create-btn {
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
}

/* 表格样式 */
.table-container {
  padding: 0 20px 20px 20px;
}

/* 使用小圆点表示状态 */
.status-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.status-active {
  background-color: #67C23A; /* 绿色 */
}

.status-draft {
  background-color: #909399; /* 灰色 */
}

.status-deprecated {
  background-color: #F56C6C; /* 红色 */
}

.status-inprogress {
  background-color: #E6A23C; /* 黄色 */
}

.status-text {
  color: #606266; /* 与其他表格文字相同的颜色 */
}

/* 操作按钮样式 */
.operation-btns {
  display: flex;
  gap: 16px;
}

.op-btn {
  padding: 0 !important;
  margin: 0 !important;
}

/* 自定义Element Plus组件样式 */
.el-button--text {
  margin: 0 !important;
}

.el-dropdown-menu__item {
  line-height: 30px;
  padding: 0 16px;
  font-size: 14px;
}
</style> 