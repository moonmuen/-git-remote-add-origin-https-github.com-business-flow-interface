<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <header class="main-header">
      <div class="logo">脑建立</div>
      <div class="header-right">
        <el-button plain size="small"><el-icon><setting /></el-icon> 后台管理</el-button>
        <div class="user-info">
          <el-avatar size="small" class="user-avatar">林</el-avatar>
          <span class="user-name">林浩鹏</span>
        </div>
      </div>
    </header>

    <div class="main-container">
      <!-- 左侧菜单 - 根据截图调整结构 -->
      <div class="sidebar">
        <el-menu default-active="4-4" class="sidebar-menu">
          <el-menu-item index="1">
            <el-icon><img src="/Users/comnova/Desktop/corsor通用/所有图标/Application Icons/首页.svg" class="menu-icon"/></el-icon>
            <span>首页</span>
          </el-menu-item>
          
          <el-sub-menu index="2">
            <template #title>
              <el-icon><img src="/Users/comnova/Desktop/corsor通用/所有图标/Application Icons/基础对象.svg" class="menu-icon"/></el-icon>
              <span>数据对象管理</span>
            </template>
            <el-menu-item index="2-1">价值流建模</el-menu-item>
            <el-menu-item index="2-2">业务流建模</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="3">
            <template #title>
              <el-icon><img src="/Users/comnova/Desktop/corsor通用/所有图标/Application Icons/过程管理.svg" class="menu-icon"/></el-icon>
              <span>过程数字化工具</span>
            </template>
            <el-menu-item index="3-1">过程框架</el-menu-item>
            <el-menu-item index="3-2">业务流建模</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="4" :open="true">
            <template #title>
              <el-icon><img src="/Users/comnova/Desktop/corsor通用/所有图标/Application Icons/应用管理.svg" class="menu-icon"/></el-icon>
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
              <el-icon><img src="/Users/comnova/Desktop/corsor通用/所有图标/Application Icons/系统配置.svg" class="menu-icon"/></el-icon>
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
          
          <!-- 顶部搜索区域 - 优化输入框和字体 -->
          <div class="search-area">
            <div class="search-form-container">
              <div class="search-form-row">
                <div class="search-item">
                  <span class="label">模型状态：</span>
                  <el-select v-model="modelStateFilter" placeholder="请选择" class="custom-select" multiple collapse-tags>
                    <el-option v-for="item in modelStateOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
                <div class="search-item">
                  <span class="label">执行状态：</span>
                  <el-select v-model="execStateFilter" placeholder="请选择" class="custom-select" multiple collapse-tags>
                    <el-option v-for="item in execStateOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
                <div class="search-item">
                  <span class="label">归属流程框架：</span>
                  <el-input v-model="flowOwnerFramework" placeholder="请输入" />
                </div>
              </div>
              
              <div class="search-form-row">
                <div class="search-item">
                  <span class="label">所有者：</span>
                  <el-input v-model="flowOwner" placeholder="请输入" />
                </div>
                <div class="search-item">
                  <span class="label">业务流名称：</span>
                  <el-input v-model="flowNameKeyword" placeholder="请输入" />
                </div>
                <div class="search-item">
                  <span class="label">备注：</span>
                  <el-input v-model="remarkKeyword" placeholder="请输入" />
                </div>
              </div>
              
              <div class="search-form-row">
                <div class="search-item">
                  <span class="label">创建时间：</span>
                  <el-date-picker
                    v-model="createTimeRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    class="custom-date-picker"
                  />
                </div>
                <div class="search-item">
                  <span class="label">更新时间：</span>
                  <el-date-picker
                    v-model="updateTimeRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    class="custom-date-picker"
                  />
                </div>
                <div class="search-item action-buttons">
                  <el-button size="default" @click="handleResetFilters">重置</el-button>
                  <el-button type="primary" size="default" plain @click="handleSearch">查询</el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 表格内容 -->
          <div class="table-container">
            <el-table 
              :data="tableData" 
              border
              style="width: 100%"
              :header-cell-style="{ backgroundColor: '#f5f7fa' }"
              v-loading="tableLoading"
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
            
            <!-- 分页 -->
            <div class="pagination-container">
              <div class="pagination-info">
                共 {{ totalItems }} 条数据
              </div>
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 创建/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'create' ? '创建价值流' : '编辑价值流'"
      width="500px"
      destroy-on-close
    >
      <el-form :model="flowForm" label-width="100px" :rules="formRules" ref="flowFormRef">
        <el-form-item label="价值流名称" prop="name">
          <el-input v-model="flowForm.name" placeholder="请输入价值流名称" />
        </el-form-item>
        <el-form-item label="归属人" prop="owner">
          <el-select v-model="flowForm.owner" placeholder="请选择归属人" style="width: 100%">
            <el-option
              v-for="item in ownerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="flowForm.description" type="textarea" rows="3" placeholder="请输入描述信息" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 发布确认对话框 -->
    <el-dialog
      v-model="publishDialogVisible"
      title="发布确认"
      width="400px"
    >
      <div class="publish-confirm">
        <p>确定要发布"{{ currentRow?.name }}"吗？</p>
        <p class="warning">发布后将立即对所有用户生效</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="publishDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmPublish">确定</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 删除确认对话框 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="下线确认"
      width="400px"
    >
      <div class="delete-confirm">
        <p>确定要下线"{{ currentRow?.name }}"吗？</p>
        <p class="warning">下线后，该价值流将不可用，但可以恢复</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmDelete">确定</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 配置对话框 -->
    <el-dialog
      v-model="configDialogVisible"
      title="业务流配置"
      width="800px"
      destroy-on-close
    >
      <el-tabs v-model="configActiveTab">
        <el-tab-pane label="关联业务流" name="relatedFlows">
          <div class="related-flows-container">
            <div class="related-flows-header">
              <el-button type="primary" size="small" @click="handleAddRelatedFlow">添加关联业务流</el-button>
            </div>
            
            <el-table :data="relatedFlowsList" style="width: 100%" border>
              <el-table-column prop="name" label="业务流名称" min-width="180" />
              <el-table-column prop="type" label="类型" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.type === 'Input' ? 'success' : 'warning'">
                    {{ scope.row.type === 'Input' ? '输入' : '输出' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createdBy" label="创建人" width="120" />
              <el-table-column prop="createdTime" label="创建时间" width="160" />
              <el-table-column label="操作" width="80" fixed="right">
                <template #default="scope">
                  <el-button type="danger" text @click="handleDeleteRelatedFlow(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="参数配置" name="params">
          <div class="params-container">
            <p class="tips">参数配置功能正在开发中...</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="执行设置" name="execution">
          <div class="execution-container">
            <p class="tips">执行设置功能正在开发中...</p>
          </div>
        </el-tab-pane>
      </el-tabs>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="configDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveFlowConfig">保存</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 添加关联业务流对话框 -->
    <el-dialog
      v-model="relatedFlowDialogVisible"
      title="添加关联业务流"
      width="800px"
      destroy-on-close
      append-to-body
    >
      <div class="add-related-flow-container">
        <div class="search-bar">
          <el-input placeholder="搜索业务流..." prefix-icon="Search" clearable />
        </div>
        
        <div class="available-flows">
          <el-table 
            :data="availableFlowsList" 
            style="width: 100%" 
            border
            @row-click="selectFlow"
            :row-class-name="(row) => selectedFlow && row.id === selectedFlow.id ? 'selected-row' : ''"
          >
            <el-table-column prop="name" label="业务流名称" min-width="180" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'">
                  {{ scope.row.status === 'active' ? '已发布' : '未发布' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="owner" label="归属人" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="160" />
          </el-table>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="relatedFlowDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAddRelatedFlow">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  HomeFilled, 
  Folder, 
  Tools, 
  Monitor, 
  Setting,
  ArrowDown,
  ArrowRight
} from '@element-plus/icons-vue'

// 搜索和筛选相关变量的定义部分
const modelStateOptions = ref([
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
  { label: '已归档', value: 'archived' },
])
const execStateOptions = ref([
  { label: '运行中', value: 'running' },
  { label: '已暂停', value: 'paused' },
  { label: '已完成', value: 'completed' },
])
const modelStateFilter = ref([]) // 多选：模型状态筛选
const execStateFilter = ref([]) // 多选：执行状态筛选
const flowOwnerFramework = ref('') // 归属流程框架
const flowOwner = ref('') // 所有者
const flowNameKeyword = ref('') // 业务流名称关键词
const remarkKeyword = ref('') // 备注关键词
const createTimeRange = ref(null) // 创建时间范围
const updateTimeRange = ref(null) // 更新时间范围

// 表格数据加载状态
const tableLoading = ref(false)

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(101)

// 业务流表格数据
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
    status: 'draft',
    statusName: '未发布',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  },
  {
    id: '4',
    name: '从机会到回款',
    status: 'deprecated',
    statusName: '已下线',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  },
  {
    id: '5',
    name: '从机会到回款',
    status: 'inProgress',
    statusName: '作业中',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  },
  {
    id: '6',
    name: '从机会到回款',
    status: 'active',
    statusName: '已发布',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  },
  {
    id: '7',
    name: '从机会到回款',
    status: 'active',
    statusName: '已发布',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  },
  {
    id: '8',
    name: '从机会到回款',
    status: 'active',
    statusName: '已发布',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  },
  {
    id: '9',
    name: '从机会到回款',
    status: 'active',
    statusName: '已发布',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  },
  {
    id: '10',
    name: '从机会到回款',
    status: 'active',
    statusName: '已发布',
    owner: '林浩鹏 (330371)',
    createTime: '2024-10-19 18:00:12',
    updateTime: '2024-10-19 18:00:12',
  }
])

// 对话框相关
const dialogVisible = ref(false)
const dialogType = ref('create') // 'create' 或 'edit'
const flowFormRef = ref(null)
const currentRow = ref(null)
const publishDialogVisible = ref(false)
const deleteDialogVisible = ref(false)

// 设置对话框相关
const configDialogVisible = ref(false)
const configActiveTab = ref('relatedFlows')
const relatedFlowsList = ref([])

// 表单数据和规则
const flowForm = reactive({
  id: '',
  name: '',
  owner: '',
  description: ''
})

const formRules = {
  name: [
    { required: true, message: '请输入价值流名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度应在 2 到 50 个字符之间', trigger: 'blur' }
  ],
  owner: [
    { required: true, message: '请选择归属人', trigger: 'change' }
  ]
}

// 归属人选项
const ownerOptions = [
  { value: '林浩鹏 (330371)', label: '林浩鹏 (330371)' },
  { value: '张三 (123456)', label: '张三 (123456)' },
  { value: '李四 (654321)', label: '李四 (654321)' }
]

// 搜索处理函数
const handleSearch = () => {
  // 在实际项目中应该基于筛选条件请求API
  ElMessage.success('搜索条件已更新')
  loadTableData()
}

// 重置筛选条件
const handleResetFilters = () => {
  modelStateFilter.value = []
  execStateFilter.value = []
  flowOwnerFramework.value = ''
  flowOwner.value = ''
  flowNameKeyword.value = ''
  remarkKeyword.value = ''
  createTimeRange.value = null
  updateTimeRange.value = null
  loadTableData()
}

// 加载表格数据
const loadTableData = () => {
  tableLoading.value = true
  
  // 模拟接口请求延迟
  setTimeout(() => {
    // 实际项目中应该调用API获取数据
    tableLoading.value = false
  }, 500)
}

// 分页相关方法
const handleSizeChange = (val) => {
  pageSize.value = val
  loadTableData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadTableData()
}

// 创建业务流
const handleCreateFlow = () => {
  dialogType.value = 'create'
  flowForm.id = ''
  flowForm.name = ''
  flowForm.owner = ''
  flowForm.description = ''
  dialogVisible.value = true
}

// 编辑业务流
const handleEdit = (row) => {
  dialogType.value = 'edit'
  currentRow.value = row
  flowForm.id = row.id
  flowForm.name = row.name
  flowForm.owner = row.owner
  flowForm.description = row.description || ''
  dialogVisible.value = true
}

// 设置业务流
const handleConfig = (row) => {
  currentRow.value = row
  configDialogVisible.value = true
  // 实际项目中应该加载关联的业务流数据
  loadRelatedFlows(row.id)
}

// 加载关联的业务流
const loadRelatedFlows = (flowId) => {
  // 模拟从API获取数据
  // 实际项目中应该调用API
  relatedFlowsList.value = [
    {
      id: '101',
      name: '客户信息管理流',
      type: 'Input',
      createdBy: '张三',
      createdTime: '2024-06-05 14:30:00'
    },
    {
      id: '102',
      name: '财务结算流程',
      type: 'Output',
      createdBy: '李四',
      createdTime: '2024-06-07 09:15:00'
    }
  ]
}

// 添加关联业务流相关变量
const relatedFlowDialogVisible = ref(false)
const availableFlowsList = ref([])
const selectedFlow = ref(null)

// 添加关联业务流
const handleAddRelatedFlow = () => {
  relatedFlowDialogVisible.value = true
  // 加载可用业务流列表
  loadAvailableFlows()
}

// 加载可用业务流
const loadAvailableFlows = () => {
  // 模拟从API获取数据
  availableFlowsList.value = [
    {
      id: '201',
      name: '客户审批流程',
      status: 'active',
      owner: '王五',
      createTime: '2024-05-15 10:20:30'
    },
    {
      id: '202',
      name: '合同管理流程',
      status: 'active',
      owner: '赵六',
      createTime: '2024-05-20 16:45:12'
    },
    {
      id: '203',
      name: '付款审批流程',
      status: 'active',
      owner: '钱七',
      createTime: '2024-05-25 11:30:45'
    }
  ]
}

// 选择业务流
const selectFlow = (flow) => {
  selectedFlow.value = flow
}

// 确认添加关联业务流
const confirmAddRelatedFlow = () => {
  if (!selectedFlow.value) {
    ElMessage.warning('请选择要关联的业务流')
    return
  }

  // 添加到关联列表
  relatedFlowsList.value.push({
    id: selectedFlow.value.id,
    name: selectedFlow.value.name,
    type: 'Input', // 默认类型，实际项目中可能需要用户选择
    createdBy: selectedFlow.value.owner,
    createdTime: new Date().toLocaleString()
  })

  ElMessage.success('添加关联业务流成功')
  relatedFlowDialogVisible.value = false
  selectedFlow.value = null
}

// 删除关联业务流
const handleDeleteRelatedFlow = (index) => {
  ElMessageBox.confirm(
    '确定要删除此关联业务流吗？',
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    relatedFlowsList.value.splice(index, 1)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消操作
  })
}

// 处理更多操作
const handleCommand = (command, row) => {
  switch (command) {
    case 'publish':
      handlePublish(row)
      break
    case 'copy':
      ElMessage.success(`复制业务流：${row.name}`)
      break
    case 'export':
      ElMessage.success(`导出业务流：${row.name}`)
      break
    case 'delete':
      handleDelete(row)
      break
  }
}

// 发布业务流
const handlePublish = (row) => {
  if (row.status === 'active') {
    ElMessage.warning('该价值流已经是发布状态')
    return
  }
  
  currentRow.value = row
  publishDialogVisible.value = true
}

// 确认发布
const confirmPublish = () => {
  // 实际项目中应该调用API进行发布操作
  
  ElMessage.success(`${currentRow.value.name} 发布成功`)
  
  // 更新状态
  const index = tableData.value.findIndex(item => item.id === currentRow.value.id)
  if (index !== -1) {
    tableData.value[index].status = 'active'
    tableData.value[index].statusName = '已发布'
  }
  
  publishDialogVisible.value = false
}

// 删除业务流
const handleDelete = (row) => {
  currentRow.value = row
  deleteDialogVisible.value = true
}

// 确认删除
const confirmDelete = () => {
  // 实际项目中应该调用API进行删除操作
  
  ElMessage.success(`${currentRow.value.name} 已下线`)
  
  // 更新状态
  const index = tableData.value.findIndex(item => item.id === currentRow.value.id)
  if (index !== -1) {
    tableData.value[index].status = 'deprecated'
    tableData.value[index].statusName = '已下线'
  }
  
  deleteDialogVisible.value = false
}

// 保存配置
const saveFlowConfig = () => {
  // 实际项目中应该调用API保存配置
  ElMessage.success('配置保存成功')
  configDialogVisible.value = false
}

// 提交表单
const submitForm = async () => {
  if (!flowFormRef.value) return
  
  try {
    await flowFormRef.value.validate()
    
    // 表单验证通过，执行提交逻辑
    if (dialogType.value === 'create') {
      // 创建逻辑
      // 实际项目中应该调用API创建数据
      const newFlow = {
        id: String(tableData.value.length + 1),
        name: flowForm.name,
        status: 'draft',
        statusName: '未发布',
        owner: flowForm.owner,
        createTime: new Date().toLocaleString(),
        updateTime: new Date().toLocaleString(),
        description: flowForm.description
      }
      
      tableData.value.unshift(newFlow)
      ElMessage.success('创建成功')
    } else {
      // 编辑逻辑
      // 实际项目中应该调用API更新数据
      const index = tableData.value.findIndex(item => item.id === flowForm.id)
      if (index !== -1) {
        tableData.value[index].name = flowForm.name
        tableData.value[index].owner = flowForm.owner
        tableData.value[index].description = flowForm.description
        tableData.value[index].updateTime = new Date().toLocaleString()
      }
      
      ElMessage.success('更新成功')
    }
    
    dialogVisible.value = false
  } catch (error) {
    console.error('表单验证失败', error)
  }
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

/* 增大左侧图标 */
.menu-icon {
  width: 24px !important;
  height: 24px !important;
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

.search-area {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.search-form-container {
  width: 100%;
}

.search-form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 12px;
}

.search-form-row:last-child {
  margin-bottom: 0;
}

.search-item {
  display: flex;
  align-items: center;
  min-width: 260px;
  flex: 1;
}

.label {
  width: 100px;
  text-align: right;
  margin-right: 8px;
  white-space: nowrap;
  color: #606266;
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

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-info {
  color: #606266;
}

/* Element Plus组件样式覆盖 */
:deep(.el-input__wrapper),
:deep(.el-select__wrapper),
:deep(.el-date-editor) {
  box-shadow: none !important;
  border: 1px solid #dcdfe6 !important;
}

:deep(.el-date-editor .el-range-input) {
  height: 30px;
  font-size: 14px;
}

:deep(.el-table .el-button) {
  padding-left: 0;
  padding-right: 0;
}

:deep(.el-button--text) {
  margin: 0 !important;
}

:deep(.el-dropdown-menu__item) {
  line-height: 30px;
  padding: 0 16px;
  font-size: 14px;
}

/* 关联业务流相关样式 */
.related-flows-container {
  padding: 16px 0;
}

.related-flows-header {
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
}

.params-container, .execution-container {
  padding: 20px;
  min-height: 200px;
}

.tips {
  color: #909399;
  font-style: italic;
}

.add-related-flow-container {
  padding: 10px 0;
}

.search-bar {
  margin-bottom: 16px;
}

.available-flows {
  height: 350px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.selected-row {
  background-color: #f0f9eb !important;
}

/* 额外的样式修复 */
.el-tabs__header {
  margin-bottom: 20px;
}

.el-dialog__body {
  padding: 10px 20px !important;
}

:deep(.el-range-input) {
  --el-date-editor-width: 100% !important;
}

:deep(.el-range-separator) {
  padding: 0 5px;
}
</style> 