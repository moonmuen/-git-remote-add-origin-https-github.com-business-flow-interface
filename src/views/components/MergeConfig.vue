<!-- 分单合并配置组件 -->
<template>
  <el-drawer
    v-model="drawerVisible"
    :title="drawerTitle"
    size="60%"
    :destroy-on-close="true"
    @close="handleClose"
  >
    <div class="merge-config">
      <!-- 默认配置 -->
      <div class="config-section">
        <h3>默认配置</h3>
        <el-radio-group v-model="defaultConfig">
          <el-radio label="oneToOne">一对一配置</el-radio>
          <el-radio label="custom">自定义配置</el-radio>
        </el-radio-group>
      </div>

      <!-- 自定义配置 -->
      <template v-if="defaultConfig === 'custom'">
        <!-- 子数据对象合并类型 -->
        <div class="config-section">
          <h3>子数据对象合并类型</h3>
          <div class="merge-type-list">
            <div 
              v-for="object in relatedObjects" 
              :key="object.id"
              class="merge-type-item"
            >
              <span class="object-name">{{ object.name }}</span>
              <el-select
                v-model="object.mergeType"
                placeholder="选择合并类型"
              >
                <el-option label="合并" value="merge" />
                <el-option label="不合并" value="noMerge" />
              </el-select>
            </div>
          </div>
        </div>

        <!-- 分组合并依据属性 -->
        <div class="config-section">
          <h3>分组合并依据属性</h3>
          <div class="group-attributes">
            <el-select
              v-model="groupAttributes"
              multiple
              placeholder="选择分组依据属性"
            >
              <el-option-group
                v-for="group in attributeGroups"
                :key="group.id"
                :label="group.name"
              >
                <el-option
                  v-for="attr in group.attributes"
                  :key="attr.id"
                  :label="attr.name"
                  :value="attr.id"
                />
              </el-option-group>
            </el-select>
          </div>
        </div>

        <!-- 分单策略 -->
        <div class="config-section">
          <h3>分单策略</h3>
          <div class="split-strategy">
            <el-radio-group v-model="splitStrategy">
              <el-radio label="all">全部分单</el-radio>
              <el-radio label="custom">自定义分单规则</el-radio>
            </el-radio-group>

            <template v-if="splitStrategy === 'custom'">
              <div class="custom-rules">
                <div class="rule-item">
                  <el-select
                    v-model="customRule.attribute"
                    placeholder="选择属性"
                  >
                    <el-option-group
                      v-for="group in attributeGroups"
                      :key="group.id"
                      :label="group.name"
                    >
                      <el-option
                        v-for="attr in group.attributes"
                        :key="attr.id"
                        :label="attr.name"
                        :value="attr.id"
                      />
                    </el-option-group>
                  </el-select>

                  <el-select
                    v-model="customRule.operator"
                    placeholder="选择运算符"
                  >
                    <el-option label="等于" value="eq" />
                    <el-option label="不等于" value="neq" />
                    <el-option label="大于" value="gt" />
                    <el-option label="小于" value="lt" />
                    <el-option label="包含" value="contains" />
                  </el-select>

                  <el-input
                    v-model="customRule.value"
                    placeholder="输入值"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <div class="drawer-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  configData: {
    type: Object,
    required: false,
    default: () => ({})
  },
  type: {
    type: String,
    required: false,
    default: 'pre', // 'pre' | 'post'
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
const drawerTitle = computed(() => {
  const typeText = props.type === 'pre' ? '前置' : '后置'
  return `分单合并配置 - ${typeText}业务流`
})

// 默认配置
const defaultConfig = ref('oneToOne')

// 相关数据对象
const relatedObjects = ref([
  {
    id: 1,
    name: '数据对象A',
    mergeType: 'merge'
  },
  {
    id: 2,
    name: '数据对象B',
    mergeType: 'noMerge'
  }
])

// 属性分组
const attributeGroups = ref([
  {
    id: 1,
    name: '数据对象A',
    attributes: [
      { id: 1, name: '属性1' },
      { id: 2, name: '属性2' }
    ]
  },
  {
    id: 2,
    name: '数据对象B',
    attributes: [
      { id: 3, name: '属性3' },
      { id: 4, name: '属性4' }
    ]
  }
])

// 分组属性
const groupAttributes = ref([])

// 分单策略
const splitStrategy = ref('all')

// 自定义规则
const customRule = ref({
  attribute: null,
  operator: null,
  value: ''
})

// 监听configData的变化，初始化表单数据
watch(() => props.configData, (newVal) => {
  if (newVal && newVal.flow) {
    // 这里可以根据flow数据初始化相关对象
    console.log('初始化分单合并配置数据:', newVal)
    
    // 示例：如果是已有配置，可以进行数据恢复
    if (newVal.existingConfig) {
      defaultConfig.value = newVal.existingConfig.type || 'oneToOne'
      // ... 其他数据恢复
    }
  }
}, { immediate: true, deep: true })

// 处理关闭
const handleClose = () => {
  drawerVisible.value = false
}

// 处理确认
const handleConfirm = () => {
  const config = {
    type: defaultConfig.value,
    mergeTypes: {},
    groupAttributes: [],
    splitStrategy: {
      type: splitStrategy.value,
      rule: null
    },
    flowType: props.type // 添加流程类型
  }

  if (defaultConfig.value === 'custom') {
    // 收集合并类型配置
    relatedObjects.value.forEach(obj => {
      config.mergeTypes[obj.id] = obj.mergeType
    })

    // 收集分组属性
    config.groupAttributes = groupAttributes.value

    // 收集分单策略
    if (splitStrategy.value === 'custom') {
      config.splitStrategy.rule = { ...customRule.value }
    }

    // 验证配置完整性
    if (groupAttributes.value.length === 0) {
      ElMessage.error('请选择分组合并依据属性')
      return
    }

    if (splitStrategy.value === 'custom' && 
        (!customRule.value.attribute || 
         !customRule.value.operator || 
         !customRule.value.value)) {
      ElMessage.error('请完善自定义分单规则')
      return
    }
  }

  emit('confirm', config)
}
</script>

<style lang="scss" scoped>
.merge-config {
  padding: 20px;
  
  .config-section {
    margin-bottom: 32px;
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1f2f3d;
      margin-bottom: 16px;
    }
  }
  
  .merge-type-list {
    .merge-type-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      
      .object-name {
        font-size: 14px;
        color: #606266;
        width: 120px;
        margin-right: 16px;
      }
      
      .el-select {
        width: 200px;
      }
    }
  }
  
  .group-attributes {
    .el-select {
      width: 100%;
    }
  }
  
  .split-strategy {
    .custom-rules {
      margin-top: 16px;
      padding: 16px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      
      .rule-item {
        display: flex;
        gap: 16px;
        
        .el-select,
        .el-input {
          width: 200px;
        }
      }
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