<template>
  <div class="business-flow-interface">
    <!-- 顶部标题区域 -->
    <header class="header">
      <h1 class="title">执行业务流管理</h1>
    </header>

    <!-- 业务流列表 -->
    <div class="flow-list">
      <el-table :data="flowList" style="width: 100%">
        <el-table-column prop="name" label="业务流名称" />
        <el-table-column prop="framework" label="归属过程框架" />
        <el-table-column prop="version" label="版本号" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="owner" label="所有者" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button 
              type="primary" 
              text
              @click="handleSettings(scope.row)"
            >
              设置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 设置抽屉 -->
    <el-drawer
      v-model="settingsDrawer.visible"
      title="业务流设置"
      size="80%"
      :destroy-on-close="true"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane label="关联其他业务流" name="flowRelation">
          <!-- 前置业务流配置 -->
          <div class="flow-config-section">
            <div class="section-header">
              <h3>前置执行业务流</h3>
              <span class="count">已关联: {{ preFlowCount }}</span>
              <el-button 
                type="primary" 
                @click="handleAddPreFlow"
              >
                添加前置执行业务流
              </el-button>
            </div>
            <div class="flow-list" v-if="preFlowList.length">
              <div 
                v-for="flow in preFlowList" 
                :key="flow.id" 
                class="flow-item"
              >
                <span>{{ flow.name }}</span>
                <div class="operations">
                  <el-button 
                    text 
                    type="primary" 
                    @click="handleConfigFlow(flow, 'pre')"
                  >
                    配置
                  </el-button>
                  <el-button 
                    text 
                    type="danger" 
                    @click="handleDeleteFlow(flow, 'pre')"
                  >
                    删除
                  </el-button>
                </div>
              </div>
            </div>
            <el-empty v-else description="暂无关联的前置业务流" />
          </div>

          <!-- 后置业务流配置 -->
          <div class="flow-config-section">
            <div class="section-header">
              <h3>后置执行业务流</h3>
              <span class="count">已关联: {{ postFlowCount }}</span>
              <el-button 
                type="primary" 
                @click="handleAddPostFlow"
              >
                添加后置执行业务流
              </el-button>
            </div>
            <div class="flow-list" v-if="postFlowList.length">
              <div 
                v-for="flow in postFlowList" 
                :key="flow.id" 
                class="flow-item"
              >
                <span>{{ flow.name }}</span>
                <div class="operations">
                  <el-button 
                    text 
                    type="primary" 
                    @click="handleConfigFlow(flow, 'post')"
                  >
                    配置
                  </el-button>
                  <el-button 
                    text 
                    type="danger" 
                    @click="handleDeleteFlow(flow, 'post')"
                  >
                    删除
                  </el-button>
                </div>
              </div>
            </div>
            <el-empty v-else description="暂无关联的后置业务流" />
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="版本管理" name="version">
          <div class="version-info">
            <p>当前版本: v{{ settingsDrawer.currentFlow?.version }}</p>
            <p>最后更新时间: {{ settingsDrawer.currentFlow?.updateTime }}</p>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 底部操作按钮 -->
      <template #footer>
        <div class="drawer-footer">
          <el-button @click="settingsDrawer.visible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveSettings">
            保存
          </el-button>
        </div>
      </template>
    </el-drawer>

    <!-- 添加业务流对话框 -->
    <FlowSelector
      v-if="flowSelector.visible"
      v-model:visible="flowSelector.visible"
      :type="flowSelector.type"
      :selected-flows="flowSelector.type === 'pre' ? preFlowList : postFlowList"
      @confirm="handleFlowSelected"
    />

    <!-- SIPOC映射配置对话框 -->
    <SipocMapping
      v-if="sipocMapping.visible"
      v-model:visible="sipocMapping.visible"
      :flow-data="sipocMapping.flowData"
      :mapping-type="sipocMapping.type"
      @confirm="handleSipocMappingConfirm"
    />

    <!-- 分单合并配置对话框 -->
    <MergeConfig
      v-if="mergeConfig.visible"
      v-model:visible="mergeConfig.visible"
      :config-data="mergeConfig.data"
      @confirm="handleMergeConfigConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import FlowSelector from './components/FlowSelector.vue'
import SipocMapping from './components/SipocMapping.vue'
import MergeConfig from './components/MergeConfig.vue'

// 状态定义
const activeTab = ref('flowRelation')

// 模拟业务流数据
const flowList = ref([
  { 
    id: 1,
    name: '示例业务流A',
    framework: '框架A',
    version: 'v1.0.0',
    remark: '这是一个示例业务流',
    owner: '张三',
    updateTime: '2025-03-18 10:00:00'
  },
  { 
    id: 2,
    name: '示例业务流B',
    framework: '框架B',
    version: 'v1.1.0',
    remark: '这是另一个示例业务流',
    owner: '李四',
    updateTime: '2025-03-19 11:00:00'
  },
  { 
    id: 3,
    name: '示例业务流C',
    framework: '框架A',
    version: 'v1.2.0',
    remark: '第三个示例业务流',
    owner: '王五',
    updateTime: '2025-03-20 12:00:00'
  }
])

// 前置业务流列表
const preFlowList = ref([])

// 后置业务流列表
const postFlowList = ref([])

// 计算属性
const preFlowCount = computed(() => preFlowList.value.length)
const postFlowCount = computed(() => postFlowList.value.length)

// 抽屉控制
const settingsDrawer = ref({
  visible: false,
  currentFlow: null
})

// 业务流选择器控制
const flowSelector = ref({
  visible: false,
  type: 'pre' // 'pre' | 'post'
})

// SIPOC映射配置控制
const sipocMapping = ref({
  visible: false,
  flowData: null,
  type: 'pre' // 'pre' | 'post'
})

// 分单合并配置控制
const mergeConfig = ref({
  visible: false,
  data: null
})

// 处理设置按钮点击
const handleSettings = (flow) => {
  settingsDrawer.value.currentFlow = flow
  settingsDrawer.value.visible = true
}

// 处理添加前置业务流
const handleAddPreFlow = () => {
  flowSelector.value.type = 'pre'
  flowSelector.value.visible = true
}

// 处理添加后置业务流
const handleAddPostFlow = () => {
  flowSelector.value.type = 'post'
  flowSelector.value.visible = true
}

// 处理业务流选择确认
const handleFlowSelected = (flow) => {
  flowSelector.value.visible = false
  sipocMapping.value.flowData = flow
  sipocMapping.value.type = flowSelector.value.type
  sipocMapping.value.visible = true
}

// 处理SIPOC映射确认
const handleSipocMappingConfirm = (mappingData) => {
  sipocMapping.value.visible = false
  
  // 保存映射数据，准备进行分单合并配置
  const mappingResult = {
    flowData: sipocMapping.value.flowData,
    mappingData: mappingData
  }

  // 设置分单合并配置的数据
  mergeConfig.value.data = {
    flow: sipocMapping.value.flowData,
    mapping: mappingData,
    type: sipocMapping.value.type // 传递流程类型（前置或后置）
  }
  
  mergeConfig.value.visible = true
}

// 处理分单合并配置确认
const handleMergeConfigConfirm = (configData) => {
  mergeConfig.value.visible = false
  
  // 构建完整的关联流数据
  const flowData = {
    ...sipocMapping.value.flowData,
    sipocMapping: mergeConfig.value.data.mapping,
    mergeConfig: configData,
    relationType: flowSelector.value.type // 记录关联类型（前置或后置）
  }
  
  // 根据流程类型添加到对应列表
  if (flowSelector.value.type === 'pre') {
    preFlowList.value.push(flowData)
  } else {
    postFlowList.value.push(flowData)
  }
  
  // 清空配置数据，避免数据污染
  sipocMapping.value.flowData = null
  mergeConfig.value.data = null
  
  ElMessage.success('配置成功')
}

// 处理配置流程
const handleConfigFlow = (flow, type) => {
  sipocMapping.value.flowData = flow
  sipocMapping.value.type = type
  sipocMapping.value.visible = true
}

// 处理删除流程
const handleDeleteFlow = (flow, type) => {
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
    ElMessage.success('删除成功')
  })
}

// 处理保存设置
const handleSaveSettings = () => {
  // TODO: 调用API保存配置
  ElMessage.success('保存成功！配置已立即生效')
  settingsDrawer.value.visible = false
}
</script>

<style lang="scss" scoped>
.business-flow-interface {
  padding: 24px;

  .header {
    margin-bottom: 24px;
    
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #1f2f3d;
    }
  }

  .flow-config-section {
    margin-bottom: 32px;
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      
      h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1f2f3d;
        margin: 0;
        margin-right: 16px;
      }
      
      .count {
        font-size: 14px;
        color: #909399;
        margin-right: auto;
      }
    }
    
    .flow-list {
      .flow-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        margin-bottom: 8px;
        
        span {
          font-size: 14px;
          color: #606266;
        }
        
        .operations {
          display: flex;
          gap: 8px;
        }
      }
    }
  }

  .drawer-footer {
    padding: 16px 20px;
    text-align: right;
  }
}
</style> 