<template>
  <div class="business-flow-interface">
    <!-- 顶部标题区域 -->
    <header class="header">
      <h1 class="title">执行业务流管理</h1>
    </header>

    <!-- 业务流列表 -->
    <div class="flow-list">
      <el-card shadow="hover" class="flow-card">
        <template #header>
          <div class="flow-card-header">
            <span>业务流列表</span>
          </div>
        </template>
        <el-table :data="flowList" style="width: 100%" border stripe>
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
      </el-card>
    </div>

    <!-- 主设置对话框 -->
    <el-dialog
      v-model="settingsDialog.visible"
      title="业务流设置"
      width="800px"
      :destroy-on-close="true"
      top="10vh"
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
            <p>当前版本: v{{ settingsDialog.currentFlow?.version }}</p>
            <p>最后更新时间: {{ settingsDialog.currentFlow?.updateTime }}</p>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 底部操作按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="settingsDialog.visible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveSettings">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 多步骤配置对话框 -->
    <el-dialog
      v-model="stepDialog.visible"
      :title="stepDialog.title"
      width="800px"
      :destroy-on-close="true"
      top="10vh"
      :show-close="currentStep === 1"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body
      class="steps-dialog"
    >
      <!-- 步骤条 -->
      <div class="step-container">
        <el-steps :active="currentStep" finish-status="success" align-center :process-status="'process'">
          <el-step title="选择业务流" description="选择要关联的业务流" />
          <el-step title="SIPOC映射" description="配置输入输出映射" />
          <el-step title="分单合并" description="配置分单合并规则" />
        </el-steps>
      </div>

      <!-- 步骤内容 -->
      <div class="step-content">
        <!-- 步骤1: 选择业务流 -->
        <div v-if="currentStep === 1" class="step-body">
          <FlowSelector
            v-if="!isEmbedded"
            :type="flowSelector.type"
            :selected-flows="flowSelector.type === 'pre' ? preFlowList : postFlowList"
            @confirm="handleFlowSelectedInStep"
          />
          
          <template v-else>
            <div class="flow-selector-embed">
              <h3>选择{{ flowSelector.type === 'pre' ? '前置' : '后置' }}业务流</h3>
              <el-table :data="availableFlows" border style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="name" label="业务流名称" />
                <el-table-column prop="framework" label="归属过程框架" />
                <el-table-column prop="version" label="版本号" />
                <el-table-column prop="owner" label="所有者" />
              </el-table>
            </div>
          </template>
        </div>

        <!-- 步骤2: SIPOC映射 -->
        <div v-if="currentStep === 2" class="step-body">
          <SipocMapping
            v-if="!isEmbedded"
            :flow-data="sipocMapping.flowData"
            :mapping-type="sipocMapping.type"
            @confirm="handleSipocMappingConfirmInStep"
          />
          
          <template v-else>
            <div class="sipoc-mapping-embed">
              <h3>SIPOC映射配置</h3>
              <div class="sipoc-preview">
                <div class="source-flow">
                  <h4>源业务流</h4>
                  <div class="flow-card">{{ sipocMapping.flowData?.name || '未选择业务流' }}</div>
                  <div class="flow-items">
                    <div class="flow-item">输入项1: 订单信息</div>
                    <div class="flow-item">输入项2: 客户信息</div>
                    <div class="flow-item">输出项1: 处理结果</div>
                  </div>
                </div>
                <div class="mapping-arrows">
                  <el-icon><ArrowRight /></el-icon>
                </div>
                <div class="target-flow">
                  <h4>目标业务流</h4>
                  <div class="flow-card">{{ settingsDialog.currentFlow?.name || '当前业务流' }}</div>
                  <div class="flow-items">
                    <div class="flow-item">输入项A: <el-select placeholder="请选择映射" style="width: 160px"></el-select></div>
                    <div class="flow-item">输入项B: <el-select placeholder="请选择映射" style="width: 160px"></el-select></div>
                    <div class="flow-item">输出项X: <el-select placeholder="请选择映射" style="width: 160px"></el-select></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 步骤3: 分单合并配置 -->
        <div v-if="currentStep === 3" class="step-body">
          <MergeConfig
            v-if="!isEmbedded"
            :config-data="mergeConfig.data"
            @confirm="handleMergeConfigConfirmInStep"
          />
          
          <template v-else>
            <div class="merge-config-embed">
              <h3>分单合并配置</h3>
              <div class="merge-options">
                <div class="option-card">
                  <h4>一对一配置</h4>
                  <el-radio v-model="mergeType" :label="1">一对一关系</el-radio>
                  <div class="config-detail" v-if="mergeType === 1">
                    <p>每个输入单据将生成一个对应的输出单据</p>
                    <el-alert type="info" :closable="false">
                      此配置适用于单据之间有明确的一一对应关系的场景
                    </el-alert>
                  </div>
                </div>
                <div class="option-card">
                  <h4>自定义配置</h4>
                  <el-radio v-model="mergeType" :label="2">自定义关系</el-radio>
                  <div class="config-detail" v-if="mergeType === 2">
                    <p>可根据业务需求自定义单据的拆分与合并规则</p>
                    <el-form label-position="top" size="small">
                      <el-form-item label="拆分字段">
                        <el-select placeholder="请选择拆分字段"></el-select>
                      </el-form-item>
                      <el-form-item label="合并规则">
                        <el-select placeholder="请选择合并规则"></el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- 步骤按钮 -->
      <template #footer>
        <div class="step-footer">
          <el-button v-if="currentStep > 1" @click="prevStep">上一步</el-button>
          <el-button v-if="currentStep < 3" type="primary" @click="nextStep">下一步</el-button>
          <el-button v-if="currentStep === 3" type="primary" @click="finishSteps">完成</el-button>
          <el-button v-if="currentStep === 1" @click="stepDialog.visible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import FlowSelector from './components/FlowSelector.vue'
import SipocMapping from './components/SipocMapping.vue'
import MergeConfig from './components/MergeConfig.vue'

// 状态定义
const activeTab = ref('flowRelation')
const currentStep = ref(1)
const isEmbedded = ref(true) // 是否使用嵌入式组件
const mergeType = ref(1)

// 可用的业务流数据
const availableFlows = ref([
  { 
    id: 4,
    name: '示例业务流D',
    framework: '框架B',
    version: 'v1.0.0',
    owner: '赵六'
  },
  { 
    id: 5,
    name: '示例业务流E',
    framework: '框架A',
    version: 'v1.1.0',
    owner: '钱七'
  }
])

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

// 对话框控制
const settingsDialog = ref({
  visible: false,
  currentFlow: null
})

// 步骤对话框控制
const stepDialog = ref({
  visible: false,
  title: '添加关联业务流'
})

// 业务流选择器控制
const flowSelector = ref({
  type: 'pre' // 'pre' | 'post'
})

// SIPOC映射配置控制
const sipocMapping = ref({
  flowData: null,
  type: 'pre' // 'pre' | 'post'
})

// 分单合并配置控制
const mergeConfig = ref({
  data: null
})

// 下一步
const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
    updateStepDialogTitle()
  }
}

// 上一步
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    updateStepDialogTitle()
  }
}

// 完成所有步骤
const finishSteps = () => {
  // 构建完整的关联流数据
  const flowData = {
    ...sipocMapping.value.flowData,
    sipocMapping: mergeConfig.value.data?.mapping || {},
    mergeConfig: { type: mergeType.value },
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
  
  // 重置步骤
  currentStep.value = 1
  
  stepDialog.value.visible = false
  ElMessage.success('配置成功')
}

// 更新步骤对话框标题
const updateStepDialogTitle = () => {
  const typeText = flowSelector.value.type === 'pre' ? '前置' : '后置'
  const stepText = currentStep.value === 1 
    ? '选择业务流'
    : currentStep.value === 2 
      ? 'SIPOC映射配置' 
      : '分单合并配置'
  
  stepDialog.value.title = `添加${typeText}业务流 - ${stepText}`
}

// 处理设置按钮点击
const handleSettings = (flow) => {
  settingsDialog.value.currentFlow = flow
  settingsDialog.value.visible = true
}

// 处理添加前置业务流
const handleAddPreFlow = () => {
  flowSelector.value.type = 'pre'
  currentStep.value = 1
  updateStepDialogTitle()
  stepDialog.value.visible = true
}

// 处理添加后置业务流
const handleAddPostFlow = () => {
  flowSelector.value.type = 'post'
  currentStep.value = 1
  updateStepDialogTitle()
  stepDialog.value.visible = true
}

// 步骤中选择业务流处理
const handleFlowSelectedInStep = (flow) => {
  sipocMapping.value.flowData = flow
  sipocMapping.value.type = flowSelector.value.type
  nextStep()
}

// 步骤中处理SIPOC映射确认
const handleSipocMappingConfirmInStep = (mappingData) => {
  // 设置分单合并配置的数据
  mergeConfig.value.data = {
    flow: sipocMapping.value.flowData,
    mapping: mappingData,
    type: sipocMapping.value.type // 传递流程类型（前置或后置）
  }
  
  nextStep()
}

// 步骤中处理分单合并配置确认
const handleMergeConfigConfirmInStep = (configData) => {
  // 保存分单合并配置
  mergeConfig.value.data = {
    ...mergeConfig.value.data,
    mergeConfig: configData
  }
  
  finishSteps()
}

// 处理配置流程
const handleConfigFlow = (flow, type) => {
  flowSelector.value.type = type
  sipocMapping.value.flowData = flow
  sipocMapping.value.type = type
  
  // 设置为第二步（SIPOC映射）
  currentStep.value = 2
  updateStepDialogTitle()
  stepDialog.value.visible = true
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
  settingsDialog.value.visible = false
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

  .flow-card {
    margin-bottom: 24px;
    
    .flow-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      span {
        font-size: 16px;
        font-weight: 500;
      }
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

  .dialog-footer {
    padding: 16px 20px;
    text-align: right;
  }
  
  // 步骤对话框样式
  .steps-dialog {
    :deep(.el-dialog__body) {
      max-height: 60vh;
      overflow-y: auto;
    }
    
    :deep(.el-step__head.is-success .el-step__icon) {
      background-color: #409EFF;
      border-color: #409EFF;
    }
    
    :deep(.el-step__title.is-success) {
      color: #409EFF;
    }
  }
  
  .step-container {
    margin-bottom: 30px;
  }
  
  .step-content {
    min-height: 300px;
    max-height: 400px;
  }

  .step-body {
    margin: 20px 0;
    min-height: 200px;
  }
  
  .step-footer {
    text-align: right;
  }
  
  // 嵌入式组件样式
  .flow-selector-embed,
  .sipoc-mapping-embed,
  .merge-config-embed {
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1f2f3d;
      margin-bottom: 20px;
    }
  }
  
  .sipoc-mapping-embed {
    .sipoc-preview {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .source-flow,
      .target-flow {
        flex: 1;
        text-align: center;
        
        h4 {
          font-size: 16px;
          margin-bottom: 10px;
        }
        
        .flow-card {
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          padding: 20px;
          background-color: #f5f7fa;
          margin-bottom: 15px;
        }
        
        .flow-items {
          text-align: left;
          border: 1px solid #ebeef5;
          border-radius: 4px;
          padding: 10px;
          
          .flow-item {
            margin-bottom: 10px;
            padding: 5px;
            border-bottom: 1px dashed #ebeef5;
            
            &:last-child {
              border-bottom: none;
              margin-bottom: 0;
            }
          }
        }
      }
      
      .mapping-arrows {
        padding: 0 20px;
        font-size: 24px;
        color: #409EFF;
      }
    }
  }
  
  .merge-config-embed {
    .merge-options {
      display: flex;
      gap: 20px;
      
      .option-card {
        flex: 1;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 20px;
        
        h4 {
          font-size: 16px;
          margin-top: 0;
          margin-bottom: 15px;
        }
        
        .config-detail {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px dashed #ebeef5;
        }
      }
    }
  }
}
</style> 