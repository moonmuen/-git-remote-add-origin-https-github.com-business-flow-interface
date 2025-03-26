<!-- SIPOC映射配置组件 -->
<template>
  <el-drawer
    v-model="drawerVisible"
    :title="drawerTitle"
    size="90%"
    :destroy-on-close="true"
    @close="handleClose"
  >
    <div class="sipoc-mapping">
      <!-- 流程图展示区域 -->
      <div class="flow-diagrams">
        <div class="flow-diagram source">
          <h3>{{ sourceFlowTitle }}</h3>
          <div class="diagram-container">
            <!-- TODO: 集成流程图组件 -->
            <div class="placeholder">流程图展示区域</div>
          </div>
          <el-button 
            type="primary" 
            text
            :icon="FullScreen"
            @click="handleFullScreen('source')"
          >
            全屏查看
          </el-button>
        </div>
        
        <div class="flow-diagram target">
          <h3>{{ targetFlowTitle }}</h3>
          <div class="diagram-container">
            <!-- TODO: 集成流程图组件 -->
            <div class="placeholder">流程图展示区域</div>
          </div>
          <el-button 
            type="primary" 
            text
            :icon="FullScreen"
            @click="handleFullScreen('target')"
          >
            全屏查看
          </el-button>
        </div>
      </div>

      <!-- 映射配置区域 -->
      <div class="mapping-config">
        <h3>SIPOC映射配置</h3>
        
        <!-- 接口类型选择 -->
        <div class="interface-type">
          <span class="label">接口类型：</span>
          <el-radio-group v-model="interfaceType">
            <el-radio label="input">作为输入</el-radio>
            <el-radio label="control">作为方案</el-radio>
          </el-radio-group>
        </div>

        <!-- 数据对象映射 -->
        <div class="mapping-table">
          <el-table
            :data="mappingList"
            style="width: 100%"
          >
            <!-- 来源数据对象 -->
            <el-table-column label="来源数据对象" min-width="200">
              <template #default="{ row }">
                <el-select
                  v-model="row.sourceObject"
                  placeholder="选择数据对象"
                  @change="handleSourceObjectChange(row)"
                >
                  <el-option
                    v-for="item in sourceObjects"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </template>
            </el-table-column>

            <!-- 来源属性 -->
            <el-table-column label="来源属性" min-width="200">
              <template #default="{ row }">
                <el-select
                  v-model="row.sourceAttribute"
                  placeholder="选择属性"
                  :disabled="!row.sourceObject"
                >
                  <el-option
                    v-for="attr in getSourceAttributes(row.sourceObject)"
                    :key="attr.id"
                    :label="attr.name"
                    :value="attr.id"
                  />
                </el-select>
              </template>
            </el-table-column>

            <!-- 目标数据对象 -->
            <el-table-column label="目标数据对象" min-width="200">
              <template #default="{ row }">
                <el-select
                  v-model="row.targetObject"
                  placeholder="选择数据对象"
                  @change="handleTargetObjectChange(row)"
                >
                  <el-option
                    v-for="item in targetObjects"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </template>
            </el-table-column>

            <!-- 目标属性 -->
            <el-table-column label="目标属性" min-width="200">
              <template #default="{ row }">
                <el-select
                  v-model="row.targetAttribute"
                  placeholder="选择属性"
                  :disabled="!row.targetObject"
                >
                  <el-option
                    v-for="attr in getTargetAttributes(row.targetObject)"
                    :key="attr.id"
                    :label="attr.name"
                    :value="attr.id"
                  />
                </el-select>
              </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column label="操作" width="100">
              <template #default="{ $index }">
                <el-button 
                  type="danger" 
                  text
                  :icon="Delete"
                  @click="handleDeleteMapping($index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 添加映射按钮 -->
          <div class="add-mapping">
            <el-button 
              type="primary" 
              text
              :icon="Plus"
              @click="handleAddMapping"
            >
              添加映射
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <div class="drawer-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleNext">下一步</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FullScreen, Delete, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  flowData: {
    type: Object,
    required: false,
    default: () => ({})
  },
  mappingType: {
    type: String,
    required: false,
    default: 'pre',
    validator: (value) => ['pre', 'post'].includes(value)
  }
})

const emit = defineEmits(['update:visible', 'confirm'])

// 抽屉可见性
const drawerVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

// 抽屉标题
const drawerTitle = computed(() => 
  props.mappingType === 'pre' ? 'SIPOC映射配置 - 前置业务流' : 'SIPOC映射配置 - 后置业务流'
)

// 流程图标题
const sourceFlowTitle = computed(() => 
  props.mappingType === 'pre' ? '前置业务流' : '当前业务流'
)
const targetFlowTitle = computed(() => 
  props.mappingType === 'pre' ? '当前业务流' : '后置业务流'
)

// 接口类型
const interfaceType = ref('input')

// 映射列表
const mappingList = ref([
  {
    id: 1,
    sourceObject: null,
    sourceAttribute: null,
    targetObject: null,
    targetAttribute: null
  }
])

// 模拟数据
const sourceObjects = ref([
  { id: 1, name: '数据对象A' },
  { id: 2, name: '数据对象B' }
])

const targetObjects = ref([
  { id: 1, name: '数据对象C' },
  { id: 2, name: '数据对象D' }
])

// 获取来源属性
const getSourceAttributes = (objectId) => {
  // TODO: 根据对象ID获取属性列表
  return [
    { id: 1, name: '属性1' },
    { id: 2, name: '属性2' }
  ]
}

// 获取目标属性
const getTargetAttributes = (objectId) => {
  // TODO: 根据对象ID获取属性列表
  return [
    { id: 1, name: '属性1' },
    { id: 2, name: '属性2' }
  ]
}

// 处理来源对象变化
const handleSourceObjectChange = (row) => {
  row.sourceAttribute = null
}

// 处理目标对象变化
const handleTargetObjectChange = (row) => {
  row.targetAttribute = null
}

// 处理添加映射
const handleAddMapping = () => {
  mappingList.value.push({
    id: Date.now(),
    sourceObject: null,
    sourceAttribute: null,
    targetObject: null,
    targetAttribute: null
  })
}

// 处理删除映射
const handleDeleteMapping = (index) => {
  mappingList.value.splice(index, 1)
}

// 处理全屏查看
const handleFullScreen = (type) => {
  // TODO: 实现流程图全屏查看
  console.log('全屏查看', type)
}

// 处理关闭
const handleClose = () => {
  drawerVisible.value = false
}

// 处理下一步
const handleNext = () => {
  // 验证配置完整性
  const isValid = mappingList.value.every(mapping => 
    mapping.sourceObject && 
    mapping.sourceAttribute && 
    mapping.targetObject && 
    mapping.targetAttribute
  )

  if (!isValid) {
    ElMessage.error('请完成所有必填项配置')
    return
  }

  emit('confirm', {
    interfaceType: interfaceType.value,
    mappings: mappingList.value
  })
}
</script>

<style lang="scss" scoped>
.sipoc-mapping {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  
  .flow-diagrams {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    
    .flow-diagram {
      flex: 1;
      
      h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1f2f3d;
        margin-bottom: 16px;
      }
      
      .diagram-container {
        height: 300px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        
        .placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #909399;
        }
      }
    }
  }
  
  .mapping-config {
    flex: 1;
    overflow: auto;
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1f2f3d;
      margin-bottom: 16px;
    }
    
    .interface-type {
      margin-bottom: 24px;
      
      .label {
        font-size: 14px;
        color: #606266;
        margin-right: 16px;
      }
    }
    
    .mapping-table {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 16px;
    }
    
    .add-mapping {
      margin-top: 16px;
      text-align: center;
    }
  }
}

.drawer-footer {
  padding: 16px 20px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style> 