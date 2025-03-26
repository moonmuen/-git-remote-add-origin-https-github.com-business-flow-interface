<!-- 业务流选择器组件 -->
<template>
  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="60%"
    :destroy-on-close="true"
    @close="handleClose"
  >
    <!-- 搜索框 -->
    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索业务流..."
        clearable
        :prefix-icon="Search"
      >
        <template #append>
          <el-button :icon="Search">搜索</el-button>
        </template>
      </el-input>
    </div>

    <!-- 业务流列表 -->
    <el-table
      :data="filteredFlowList"
      style="width: 100%"
      height="400"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="业务流名称" />
      <el-table-column prop="framework" label="归属过程框架" />
      <el-table-column prop="version" label="版本号" width="100" />
      <el-table-column prop="owner" label="所有者" width="120" />
      <el-table-column prop="updateTime" label="更新时间" width="160" />
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button 
          type="primary" 
          :disabled="!selectedFlow"
          @click="handleConfirm"
        >
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['pre', 'post'].includes(value)
  },
  selectedFlows: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:visible', 'confirm'])

// 对话框标题
const dialogTitle = computed(() => 
  props.type === 'pre' ? '添加前置执行业务流' : '添加后置执行业务流'
)

// 对话框可见性
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

// 搜索关键字
const searchKeyword = ref('')

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 模拟数据
const flowList = ref([
  {
    id: 1,
    name: '业务流程A',
    framework: '框架A',
    version: 'v1.0.0',
    owner: '张三',
    updateTime: '2025-03-18 10:00:00'
  },
  {
    id: 2,
    name: '业务流程B',
    framework: '框架B',
    version: 'v1.0.0',
    owner: '李四',
    updateTime: '2025-03-18 11:00:00'
  }
])

// 过滤后的列表
const filteredFlowList = computed(() => {
  const keyword = searchKeyword.value.toLowerCase()
  return flowList.value
    .filter(flow => !props.selectedFlows.find(f => f.id === flow.id))
    .filter(flow => 
      flow.name.toLowerCase().includes(keyword) ||
      flow.framework.toLowerCase().includes(keyword) ||
      flow.owner.toLowerCase().includes(keyword)
    )
})

// 选中的业务流
const selectedFlow = ref(null)

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedFlow.value = selection[0]
}

// 处理页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page
  // TODO: 调用API获取数据
}

// 处理每页条数变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
  // TODO: 调用API获取数据
}

// 处理关闭
const handleClose = () => {
  dialogVisible.value = false
  searchKeyword.value = ''
  selectedFlow.value = null
}

// 处理确认
const handleConfirm = () => {
  if (selectedFlow.value) {
    emit('confirm', selectedFlow.value)
  }
}

// 监听搜索关键字变化
watch(searchKeyword, () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.search-bar {
  margin-bottom: 16px;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style> 