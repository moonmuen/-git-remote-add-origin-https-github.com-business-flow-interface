<!-- 业务流接口定义主界面 -->
<template>
  <div class="business-flow-interface">
    <!-- 顶部标题区域 -->
    <header class="header">
      <h1 class="title">执行业务流管理</h1>
      
      <!-- 搜索框 -->
      <div class="search-bar">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索业务流..."
          clearable
          @input="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </header>

    <!-- 业务流列表 -->
    <div class="flow-list">
      <el-card shadow="hover" class="flow-list-card">
        <template #header>
          <div class="card-header">
            <span>业务流列表</span>
            <el-button type="primary" size="small" @click="handleAddFlow">
              <el-icon><Plus /></el-icon>新建业务流
            </el-button>
          </div>
        </template>
        
        <el-table 
          :data="flowList" 
          stripe 
          border
          v-loading="tableLoading"
          element-loading-text="加载中..."
          :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
          class="flow-table"
        >
          <el-table-column prop="name" label="业务流名称" min-width="150">
            <template #default="scope">
              <div class="flow-name-cell">
                <span>{{ scope.row.name }}</span>
                <el-tag 
                  size="small" 
                  :type="scope.row.status === 'active' ? 'success' : 
                         scope.row.status === 'draft' ? 'info' : 'warning'"
                  effect="plain"
                >
                  {{ 
                    scope.row.status === 'active' ? '已发布' : 
                    scope.row.status === 'draft' ? '草稿' : '待审核' 
                  }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="version" label="当前版本" width="100">
            <template #default="scope">
              <el-tooltip 
                effect="dark" 
                :content="`发布时间: ${scope.row.updateTime}`" 
                placement="top"
              >
                <span>v{{ scope.row.version }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="120">
            <template #default="scope">
              <el-tag 
                size="small" 
                :type="scope.row.type === 'core' ? 'danger' : 'primary'"
              >
                {{ scope.row.type === 'core' ? '核心业务流' : '普通业务流' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180" />
          <el-table-column label="操作" width="220" fixed="right">
            <template #default="scope">
              <el-button 
                size="small" 
                type="primary" 
                plain
                @click="handleViewFlow(scope.row)"
              >
                配置
              </el-button>
              <el-dropdown trigger="click" @command="(cmd) => handleCommand(cmd, scope.row)">
                <el-button size="small" type="primary" plain>
                  更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="edit">编辑</el-dropdown-item>
                    <el-dropdown-item command="clone">克隆</el-dropdown-item>
                    <el-dropdown-item command="publish" v-if="scope.row.status === 'draft'">发布</el-dropdown-item>
                    <el-dropdown-item command="history">历史版本</el-dropdown-item>
                    <el-dropdown-item command="delete" divided>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        
        <div v-if="!flowList.length" class="empty-state">
          <el-empty description="暂无业务流数据">
            <el-button type="primary" @click="handleAddFlow">新建业务流</el-button>
          </el-empty>
        </div>
        
        <div class="pagination">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[5, 10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
          />
        </div>
      </el-card>
    </div>

    <!-- 设置抽屉 -->
    <el-drawer
      v-model="drawer.visible"
      size="60%"
      :title="drawer.title"
      :with-header="true"
      :destroy-on-close="true"
      :close-on-press-escape="true"
      direction="rtl"
      class="drawer-container"
    >
      <el-tabs v-model="activeTab" class="settings-tabs">
        <el-tab-pane label="关联其他业务流" name="relations">
          <!-- 前置业务流 -->
          <div class="flow-section">
            <div class="flow-section-title">
              <div>
                <el-icon><circle-plus /></el-icon>
                前置业务流 ({{ preFlowList.length }})
              </div>
              <el-button 
                type="primary" 
                size="small" 
                @click="handleAddFlow('pre')"
              >
                添加前置业务流
              </el-button>
            </div>
            
            <div v-if="preFlowList.length === 0" class="flow-section-empty">
              暂无前置业务流，点击添加按钮关联前置业务流
            </div>
            
            <div v-else>
              <div 
                v-for="flow in preFlowList" 
                :key="flow.id" 
                class="flow-item"
              >
                <div class="flow-item-info">
                  <div class="flow-name">{{ flow.name }}</div>
                  <div class="flow-meta">
                    <span>版本: v{{ flow.version }}</span>
                    <span>所有者: {{ flow.owner || 'N/A' }}</span>
                  </div>
                </div>
                <div class="flow-item-actions">
                  <el-button 
                    size="small" 
                    type="primary" 
                    @click="handleConfigSipoc('pre', flow)"
                  >
                    SIPOC映射
                  </el-button>
                  <el-button 
                    size="small" 
                    type="primary" 
                    @click="handleConfigMerge('pre', flow)"
                  >
                    分单合并
                  </el-button>
                  <el-button 
                    size="small" 
                    type="danger" 
                    plain
                    @click="handleDeleteRelatedFlow(flow, 'pre')"
                  >
                    删除
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 后置业务流 -->
          <div class="flow-section">
            <div class="flow-section-title">
              <div>
                <el-icon><circle-plus /></el-icon>
                后置业务流 ({{ postFlowList.length }})
              </div>
              <el-button 
                type="primary" 
                size="small" 
                @click="handleAddFlow('post')"
              >
                添加后置业务流
              </el-button>
            </div>
            
            <div v-if="postFlowList.length === 0" class="flow-section-empty">
              暂无后置业务流，点击添加按钮关联后置业务流
            </div>
            
            <div v-else>
              <div 
                v-for="flow in postFlowList" 
                :key="flow.id" 
                class="flow-item"
              >
                <div class="flow-item-info">
                  <div class="flow-name">{{ flow.name }}</div>
                  <div class="flow-meta">
                    <span>版本: v{{ flow.version }}</span>
                    <span>所有者: {{ flow.owner || 'N/A' }}</span>
                  </div>
                </div>
                <div class="flow-item-actions">
                  <el-button 
                    size="small" 
                    type="primary" 
                    @click="handleConfigSipoc('post', flow)"
                  >
                    SIPOC映射
                  </el-button>
                  <el-button 
                    size="small" 
                    type="primary" 
                    @click="handleConfigMerge('post', flow)"
                  >
                    分单合并
                  </el-button>
                  <el-button 
                    size="small" 
                    type="danger" 
                    plain
                    @click="handleDeleteRelatedFlow(flow, 'post')"
                  >
                    删除
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="版本管理" name="versions">
          <el-empty description="版本管理功能正在开发中"></el-empty>
        </el-tab-pane>
      </el-tabs>
      
      <template #footer>
        <div class="drawer-footer">
          <el-button @click="drawer.visible = false">关闭</el-button>
        </div>
      </template>
    </el-drawer>

    <!-- 添加业务流对话框 -->
    <FlowSelector
      v-model:visible="flowSelector.visible"
      :type="flowSelector.type"
      :selected-flows="flowSelector.selectedFlows"
      @confirm="handleFlowSelected"
    />

    <!-- SIPOC映射配置对话框 -->
    <el-dialog
      v-model="sipocMapping.visible"
      :title="sipocMapping.type === 'pre' ? 'SIPOC映射配置 - 前置业务流' : 'SIPOC映射配置 - 后置业务流'"
      width="80%"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
      <div class="sipoc-content">
        <SipocMapping
          :flow-data="sipocMapping.flowData || {}"
          :mapping-type="sipocMapping.type"
          @close="sipocMapping.visible = false"
          @confirm="handleSipocMappingConfirm"
        />
        
        <!-- 默认内容，当SipocMapping组件没有内容时显示 -->
        <div v-if="!sipocMapping.flowData" class="empty-content">
          <el-alert type="info" :closable="false">
            请先选择要配置的业务流，然后进行SIPOC映射配置
          </el-alert>
          
          <div class="sample-mapping">
            <div class="mapping-section">
              <h4>源业务流输出</h4>
              <div class="mapping-item">
                <span>订单信息</span>
                <el-icon><arrow-right /></el-icon>
                <el-select placeholder="选择映射目标" disabled></el-select>
              </div>
              <div class="mapping-item">
                <span>客户数据</span>
                <el-icon><arrow-right /></el-icon>
                <el-select placeholder="选择映射目标" disabled></el-select>
              </div>
            </div>
            
            <div class="mapping-section">
              <h4>目标业务流输入</h4>
              <div class="mapping-item">
                <span>供应商信息</span>
                <el-icon><arrow-right /></el-icon>
                <el-select placeholder="选择映射来源" disabled></el-select>
              </div>
              <div class="mapping-item">
                <span>产品规格</span>
                <el-icon><arrow-right /></el-icon>
                <el-select placeholder="选择映射来源" disabled></el-select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="sipocMapping.visible = false">取消</el-button>
          <el-button 
            type="primary" 
            @click="$refs.sipocMappingRef?.handleConfirm()"
          >
            下一步
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分单合并配置对话框 -->
    <el-dialog
      v-model="mergeConfig.visible"
      :title="flowSelector.type === 'pre' ? '分单合并配置 - 前置业务流' : '分单合并配置 - 后置业务流'"
      width="70%"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
      <div class="merge-content">
        <MergeConfig
          :config-data="mergeConfig.data || {}"
          :type="flowSelector.type"
          @close="mergeConfig.visible = false"
          @confirm="handleMergeConfigConfirm"
        />
        
        <!-- 默认内容，当MergeConfig组件没有内容时显示 -->
        <div v-if="!mergeConfig.data.flowId" class="empty-content">
          <el-alert type="info" :closable="false">
            请先选择要配置的业务流，然后进行分单合并配置
          </el-alert>
          
          <div class="sample-merge">
            <div class="merge-options">
              <div class="option-card active">
                <h4>一对一配置</h4>
                <p>每个输入单据将生成一个对应的输出单据</p>
                <div class="option-detail">
                  <el-image src="https://placeholder.co/300x150" fit="contain" />
                </div>
              </div>
              <div class="option-card">
                <h4>拆分配置</h4>
                <p>一个输入单据拆分为多个输出单据</p>
                <div class="option-detail">
                  <el-image src="https://placeholder.co/300x150" fit="contain" />
                </div>
              </div>
              <div class="option-card">
                <h4>合并配置</h4>
                <p>多个输入单据合并为一个输出单据</p>
                <div class="option-detail">
                  <el-image src="https://placeholder.co/300x150" fit="contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="mergeConfig.visible = false">取消</el-button>
          <el-button 
            type="primary" 
            @click="$refs.mergeConfigRef?.handleConfirm()"
          >
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, ArrowDown, CirclePlus } from '@element-plus/icons-vue'
import FlowSelector from './components/FlowSelector.vue'
import SipocMapping from './components/SipocMapping.vue'
import MergeConfig from './components/MergeConfig.vue'

// 状态定义
const activeTab = ref('relations')

// 添加分页配置
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 100
})

// 数据
const tableLoading = ref(false)
const allFlowList = ref([
  { 
    id: '001', 
    name: '采购订单管理', 
    version: '1.2.0', 
    status: 'active', 
    type: 'core', 
    updateTime: '2023-11-15 14:30:22',
    owner: '采购部',
    remark: '核心业务流程，处理从需求到收货的全流程'
  },
  { 
    id: '002', 
    name: '库存管理', 
    version: '2.0.1', 
    status: 'active', 
    type: 'normal', 
    updateTime: '2023-12-01 09:15:45',
    owner: '仓储部',
    remark: '包含入库、出库、盘点的库存管理流程'
  },
  { 
    id: '003', 
    name: '付款申请', 
    version: '1.0.0', 
    status: 'draft', 
    type: 'normal', 
    updateTime: '2024-01-10 16:42:18',
    owner: '财务部',
    remark: '处理供应商付款申请的业务流程'
  },
  { 
    id: '004', 
    name: '供应商管理', 
    version: '1.5.2', 
    status: 'review', 
    type: 'normal', 
    updateTime: '2023-10-20 11:25:37',
    owner: '采购部',
    remark: '处理供应商引入、评估、绩效管理的业务流程'
  },
  { 
    id: '005', 
    name: '质量检验', 
    version: '2.3.1', 
    status: 'active', 
    type: 'core', 
    updateTime: '2024-02-05 10:30:15',
    owner: '质量部',
    remark: '包含进货检验、过程检验、出货检验的全流程'
  }
])

// 分页后的列表
const flowList = computed(() => {
  // 先按关键字过滤
  let filtered = allFlowList.value
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(flow => 
      flow.name.toLowerCase().includes(keyword) || 
      flow.owner.toLowerCase().includes(keyword) ||
      flow.remark.toLowerCase().includes(keyword)
    )
  }
  
  // 更新总数
  pagination.value.total = filtered.length
  
  // 然后分页
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return filtered.slice(start, end)
})

// 前置业务流列表
const preFlowList = ref([])

// 后置业务流列表
const postFlowList = ref([])

// 业务流选择器
const flowSelector = ref({
  visible: false,
  type: 'pre',  // 'pre' 或 'post'
  selectedFlows: []
})

// SIPOC映射配置
const sipocMapping = ref({
  visible: false,
  type: 'pre',  // 'pre' 或 'post'
  flowData: null
})

// 分单合并配置
const mergeConfig = ref({
  visible: false,
  type: 'pre',  // 'pre' 或 'post'
  data: {}
})

// 搜索关键词
const searchKeyword = ref('')

// 抽屉控制
const drawer = ref({
  visible: false,
  title: '业务流设置',
  currentFlow: null
})

// 处理设置按钮点击
const handleSettings = (flow) => {
  drawer.value.currentFlow = flow
  drawer.value.visible = true
}

// 处理查看业务流配置
const handleViewFlow = (flow) => {
  drawer.value.title = `业务流配置: ${flow.name}`
  drawer.value.currentFlow = flow
  drawer.value.visible = true
  
  // 模拟加载业务流配置
  // 实际项目中应该从API获取业务流的配置数据
  setTimeout(() => {
    // 模拟前置业务流
    preFlowList.value = allFlowList.value.filter(f => f.id !== flow.id).slice(0, 2)
    // 模拟后置业务流
    postFlowList.value = allFlowList.value.filter(f => f.id !== flow.id).slice(2, 3)
  }, 500)
}

// 处理添加前置/后置业务流
const handleAddFlow = (type) => {
  if(!type) {
    // 新建业务流逻辑
    ElMessage.success('即将跳转到业务流创建页面')
    return
  }
  
  // 显示业务流选择器
  flowSelector.value.type = type
  flowSelector.value.visible = true
}

// 处理业务流选择确认
const handleFlowSelected = (selectedFlows) => {
  // 根据当前类型添加到前置或后置业务流列表
  if (flowSelector.value.type === 'pre') {
    preFlowList.value = [...preFlowList.value, ...selectedFlows]
  } else {
    postFlowList.value = [...postFlowList.value, ...selectedFlows]
  }
  
  flowSelector.value.visible = false
  ElMessage.success(`已成功添加${selectedFlows.length}个业务流`)
}

// 处理SIPOC映射配置
const handleConfigSipoc = (type, flow) => {
  sipocMapping.value.type = type
  sipocMapping.value.flowData = flow
  sipocMapping.value.visible = true
}

// 处理SIPOC映射确认
const handleSipocMappingConfirm = (mappingData) => {
  // 处理SIPOC映射确认逻辑
  // 在实际项目中保存映射数据到数据库
  console.log('SIPOC映射数据:', mappingData)
  
  // 如果需要继续配置分单合并，可以自动打开分单合并配置
  sipocMapping.value.visible = false
  ElMessage.success('SIPOC映射已保存')
  
  // 自动打开分单合并配置
  mergeConfig.value.type = sipocMapping.value.type
  mergeConfig.value.data = {
    flowId: sipocMapping.value.flowData.id,
    // 其他需要传递的数据
  }
  mergeConfig.value.visible = true
}

// 处理分单合并配置
const handleConfigMerge = (type, flow) => {
  mergeConfig.value.type = type
  mergeConfig.value.data = {
    flowId: flow.id,
    // 其他配置数据
  }
  mergeConfig.value.visible = true
}

// 处理分单合并确认
const handleMergeConfigConfirm = (configData) => {
  // 处理分单合并确认逻辑
  // 在实际项目中保存配置数据到数据库
  console.log('分单合并配置数据:', configData)
  
  mergeConfig.value.visible = false
  ElMessage.success('分单合并配置已保存')
}

// 处理删除流程
const handleDeleteFlow = (flow, type) => {
  ElMessageBox.confirm(
    `确定要删除业务流"${flow.name}"吗？此操作不可逆。`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 这里应该调用API删除业务流
    const index = allFlowList.value.findIndex(item => item.id === flow.id)
    if (index !== -1) {
      allFlowList.value.splice(index, 1)
      pagination.value.total = allFlowList.value.length
      ElMessage.success('删除成功')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 处理删除业务流关联
const handleDeleteRelatedFlow = (flow, type) => {
  ElMessageBox.confirm(
    `您确定要删除本业务流与"${flow.name}"的关联关系吗？\n⚠️ 删除后将导致：\n• SIPOC映射、分单合并等配置将被被清除\n• 业务流间数据传递将中断\n此操作不可撤销，请谨慎操作！`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    if (type === 'pre') {
      preFlowList.value = preFlowList.value.filter(f => f.id !== flow.id)
    } else {
      postFlowList.value = postFlowList.value.filter(f => f.id !== flow.id)
    }
    ElMessage.success('关联关系已删除')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 处理保存设置
const handleSaveSettings = () => {
  // TODO: 调用API保存配置
  ElMessage.success('保存成功！配置已立即生效')
  drawer.value.visible = false
}

// 处理页码变化
const handleCurrentChange = (page) => {
  pagination.value.currentPage = page
  // 实际项目中这里通常会调用API获取数据
}

// 处理每页条数变化
const handleSizeChange = (size) => {
  pagination.value.pageSize = size
  pagination.value.currentPage = 1
  // 实际项目中这里通常会调用API获取数据
}

// 处理搜索
const handleSearch = () => {
  // 实际项目中这里通常会调用API获取数据
}

// 处理更多操作命令
const handleCommand = (cmd, flow) => {
  // 根据命令执行相应的操作
  switch (cmd) {
    case 'edit':
      // 实现编辑逻辑
      break
    case 'clone':
      // 实现克隆逻辑
      break
    case 'publish':
      // 实现发布逻辑
      break
    case 'history':
      // 实现查看历史版本逻辑
      break
    case 'delete':
      // 实现删除逻辑
      handleDeleteFlow(flow, flow.type === 'core' ? 'core' : 'normal')
      break
  }
}

// 模拟加载数据
const loadData = () => {
  tableLoading.value = true
  setTimeout(() => {
    tableLoading.value = false
  }, 800)
}

// 组件挂载
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.business-flow-interface {
  height: 100%;
  padding: 16px;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    .title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
    
    .search-bar {
      width: 300px;
    }
  }
  
  .flow-list {
    &-card {
      margin-bottom: 20px;
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .flow-table {
        margin-bottom: 16px;
      }
      
      .flow-name-cell {
        display: flex;
        align-items: center;
        
        span {
          margin-right: 8px;
          font-weight: 500;
        }
      }
      
      .empty-state {
        padding: 40px 0;
        text-align: center;
      }
      
      .pagination {
        padding-top: 16px;
        text-align: right;
        border-top: 1px solid #ebeef5;
      }
    }
  }
  
  .drawer-container {
    .el-drawer__header {
      margin-bottom: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid #ebeef5;
    }
    
    .settings-tabs {
      height: calc(100% - 80px);
      
      .el-tabs__content {
        height: calc(100% - 40px);
        overflow: auto;
      }
    }
    
    .flow-section {
      margin-bottom: 24px;
      
      &-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid #ebeef5;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      &-empty {
        padding: 20px 0;
        text-align: center;
        color: #909399;
        background: #f8f8f9;
        border-radius: 4px;
      }
      
      .flow-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        margin-bottom: 12px;
        border-radius: 4px;
        background: #f8f8f9;
        border: 1px solid #ebeef5;
        
        &-info {
          flex: 1;
          
          .flow-name {
            font-weight: 500;
            margin-bottom: 4px;
          }
          
          .flow-meta {
            display: flex;
            align-items: center;
            color: #909399;
            font-size: 12px;
            
            span {
              margin-right: 16px;
            }
          }
        }
        
        &-actions {
          display: flex;
          align-items: center;
          
          .el-button {
            margin-left: 8px;
          }
        }
      }
    }
    
    .drawer-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px 20px;
      background: #fff;
      text-align: right;
      border-top: 1px solid #ebeef5;
      
      .el-button {
        margin-left: 8px;
      }
    }
  }
  
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    
    .el-button {
      margin-left: 12px;
    }
  }
  
  // SIPOC映射和分单合并配置样式
  .sipoc-content,
  .merge-content {
    min-height: 300px;
    
    .empty-content {
      padding: 20px;
      
      .el-alert {
        margin-bottom: 24px;
      }
    }
  }
  
  .sample-mapping {
    display: flex;
    gap: 30px;
    margin-top: 20px;
    
    .mapping-section {
      flex: 1;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      padding: 16px;
      
      h4 {
        margin-top: 0;
        margin-bottom: 16px;
        font-size: 16px;
        color: #606266;
      }
      
      .mapping-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        
        span {
          width: 120px;
          color: #606266;
        }
        
        .el-icon {
          margin: 0 12px;
          color: #409EFF;
        }
        
        .el-select {
          flex: 1;
        }
      }
    }
  }
  
  .sample-merge {
    margin-top: 20px;
    
    .merge-options {
      display: flex;
      gap: 20px;
      
      .option-card {
        flex: 1;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        padding: 16px;
        
        &.active {
          border-color: #409EFF;
          background-color: #ecf5ff;
        }
        
        h4 {
          margin-top: 0;
          margin-bottom: 8px;
          font-size: 16px;
          color: #303133;
        }
        
        p {
          color: #606266;
          margin-bottom: 16px;
        }
        
        .option-detail {
          text-align: center;
        }
      }
    }
  }
}
</style> 