<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <header class="main-header">
      <div class="logo">脑建立</div>
      <div class="header-right">
        <el-button plain size="small"><el-icon><setting /></el-icon> 后台管理</el-button>
        <div class="user-info">
          <el-avatar size="small" class="user-avatar">林</el-avatar>
          <span>林浩鹏</span>
        </div>
      </div>
    </header>

    <div class="main-container">
      <!-- 左侧菜单 - 根据截图调整结构 -->
      <div class="sidebar">
        <el-menu default-active="4-4" class="sidebar-menu">
          <el-menu-item index="1">
            <el-icon><setting /></el-icon>
            <span>首页</span>
          </el-menu-item>
          
          <el-sub-menu index="2">
            <template #title>
              <el-icon><menu /></el-icon>
              <span>数据对象管理</span>
            </template>
            <el-menu-item index="2-1">价值流建模</el-menu-item>
            <el-menu-item index="2-2">业务流建模</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="3">
            <template #title>
              <el-icon><connection /></el-icon>
              <span>过程数字化工具</span>
            </template>
            <el-menu-item index="3-1">过程框架</el-menu-item>
            <el-menu-item index="3-2">业务流建模</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="4" :open="true">
            <template #title>
              <el-icon><setting /></el-icon>
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
              <el-icon><tools /></el-icon>
              <span>系统配置</span>
            </template>
            <el-menu-item index="5-1">系统设置</el-menu-item>
            <el-menu-item index="5-2">用户管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>

      <!-- 主内容区域 -->
      <div class="main-content">
        <!-- 创建按钮调整大小 -->
        <div class="create-button-row">
          <el-button type="primary" @click="handleCreateFlow" class="normal-create-btn">创建</el-button>
        </div>
        
        <!-- 顶部搜索区域 - 优化输入框和字体 -->
        <div class="search-area">
          <div class="search-form-container">
            <div class="search-form-row">
              <div class="search-item">
                <span class="label">模型状态：</span>
                <div class="cdt-input cdt-input--normal">
                  <div class="cdt-input__wrapper">
                    <el-select v-model="modelStateFilter" placeholder="请选择" class="custom-select" multiple collapse-tags>
                      <el-option v-for="item in modelStateOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="search-item">
                <span class="label">执行状态：</span>
                <div class="cdt-input cdt-input--normal">
                  <div class="cdt-input__wrapper">
                    <el-select v-model="execStateFilter" placeholder="请选择" class="custom-select" multiple collapse-tags>
                      <el-option v-for="item in execStateOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="search-item">
                <span class="label">归属流程框架：</span>
                <div class="cdt-input cdt-input--normal">
                  <div class="cdt-input__wrapper">
                    <input type="text" class="cdt-input__inner" placeholder="请输入" v-model="flowOwnerFramework" />
                  </div>
                </div>
              </div>
            </div>
            
            <div class="search-form-row">
              <div class="search-item">
                <span class="label">所有者：</span>
                <div class="cdt-input cdt-input--normal">
                  <div class="cdt-input__wrapper">
                    <input type="text" class="cdt-input__inner" placeholder="请输入" v-model="flowOwner" />
                  </div>
                </div>
              </div>
              <div class="search-item">
                <span class="label">业务流名称：</span>
                <div class="cdt-input cdt-input--normal">
                  <div class="cdt-input__wrapper">
                    <input type="text" class="cdt-input__inner" placeholder="请输入" v-model="flowNameKeyword" />
                  </div>
                </div>
              </div>
              <div class="search-item">
                <span class="label">备注：</span>
                <div class="cdt-input cdt-input--normal">
                  <div class="cdt-input__wrapper">
                    <input type="text" class="cdt-input__inner" placeholder="请输入" v-model="remarkKeyword" />
                  </div>
                </div>
              </div>
            </div>
            
            <div class="search-form-row">
              <div class="search-item">
                <span class="label">创建时间：</span>
                <div class="date-range-wrapper">
                  <div class="cdt-input cdt-input--normal">
                    <div class="cdt-input__wrapper">
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
                  </div>
                </div>
              </div>
              <div class="search-item">
                <span class="label">更新时间：</span>
                <div class="date-range-wrapper">
                  <div class="cdt-input cdt-input--normal">
                    <div class="cdt-input__wrapper">
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
                  </div>
                </div>
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
            
            <el-table-column prop="name" label="价值流名称" min-width="180">
              <template #default="scope">
                <div class="flow-name">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            
            <el-table-column prop="type" label="模型状态" width="100">
              <template #default="scope">
                <el-tag 
                  :type="scope.row.status === 'active' ? 'success' : 
                         scope.row.status === 'draft' ? 'info' : 
                         scope.row.status === 'deprecated' ? 'danger' : 'warning'"
                  effect="plain"
                  size="small"
                >
                  {{ scope.row.statusName }}
                </el-tag>
              </template>
            </el-table-column>
            
            <el-table-column prop="owner" label="归属人" width="150" />
            
            <el-table-column prop="createTime" label="创建时间" width="180" />
            
            <el-table-column prop="updateTime" label="更新时间" width="180" />
            
            <el-table-column label="操作" width="240" fixed="right">
              <template #default="scope">
                <div class="operation-btns">
                  <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button size="small" @click="handleConfig(scope.row)">设置</el-button>
                  <el-dropdown trigger="click" @command="(command) => handleCommand(command, scope.row)">
                    <el-button size="small">
                      更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="publish">发布</el-dropdown-item>
                        <el-dropdown-item command="copy">复制</el-dropdown-item>
                        <el-dropdown-item command="export">导出</el-dropdown-item>
                        <el-dropdown-item command="delete" divided>删除</el-dropdown-item>
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
    
    <!-- 添加关联业务流步骤对话框 -->
    <el-dialog
      v-model="relatedFlowDialogVisible"
      title="添加关联业务流"
      width="800px"
      destroy-on-close
      class="steps-dialog"
    >
      <div class="steps-container">
        <el-steps :active="activeStep" finish-status="success">
          <el-step title="选择业务流"></el-step>
          <el-step title="SIPOC映射"></el-step>
          <el-step title="分单合并配置"></el-step>
        </el-steps>
        
        <!-- 步骤1：选择业务流 -->
        <div v-if="activeStep === 0" class="step-content">
          <div class="step-body">
            <el-table
              :data="availableFlows"
              border
              stripe
              height="350px"
              @selection-change="handleFlowSelectionChange"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="name" label="业务流名称" />
              <el-table-column prop="owner" label="归属人" />
              <el-table-column prop="status" label="状态">
                <template #default="scope">
                  <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'">
                    {{ scope.row.statusName }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        
        <!-- 步骤2：SIPOC映射 -->
        <div v-if="activeStep === 1" class="step-content sipoc-mapping">
          <div class="mapping-header">
            <div class="source-flow">
              <h4>源业务流：{{ currentRow?.name }}</h4>
            </div>
            <el-divider direction="vertical" />
            <div class="target-flow">
              <h4>目标业务流：{{ selectedFlows[0]?.name }}</h4>
            </div>
          </div>
          
          <div class="mapping-content">
            <el-tabs v-model="sipocActiveTab">
              <el-tab-pane label="输入映射" name="input">
                <div class="mapping-table">
                  <el-table :data="inputMappings" border stripe>
                    <el-table-column label="源业务流输入" prop="sourceInput" />
                    <el-table-column label="目标业务流输入" prop="targetInput">
                      <template #default="scope">
                        <el-select v-model="scope.row.targetInput" placeholder="选择映射目标">
                          <el-option 
                            v-for="item in targetInputOptions" 
                            :key="item.value" 
                            :label="item.label" 
                            :value="item.value" 
                          />
                        </el-select>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="输出映射" name="output">
                <div class="mapping-table">
                  <el-table :data="outputMappings" border stripe>
                    <el-table-column label="源业务流输出" prop="sourceOutput" />
                    <el-table-column label="目标业务流输出" prop="targetOutput">
                      <template #default="scope">
                        <el-select v-model="scope.row.targetOutput" placeholder="选择映射目标">
                          <el-option 
                            v-for="item in targetOutputOptions" 
                            :key="item.value" 
                            :label="item.label" 
                            :value="item.value" 
                          />
                        </el-select>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        
        <!-- 步骤3：分单合并配置 -->
        <div v-if="activeStep === 2" class="step-content">
          <div class="step-body split-merge-config">
            <template v-if="selectedFlows.length > 0">
              <div class="config-tabs">
                <el-tabs v-model="splitMergeActiveTab">
                  <el-tab-pane label="一对一" name="oneToOne">
                    <div class="config-content">
                      <div class="one-to-one-config">
                        <div class="config-description">
                          <p>一对一配置：源业务流的每个实例将创建一个对应的目标业务流实例</p>
                        </div>
                        <div class="config-diagram">
                          <div class="source-flow-box">源业务流实例</div>
                          <el-icon><arrow-right /></el-icon>
                          <div class="target-flow-box">目标业务流实例</div>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="分单" name="split">
                    <div class="config-content">
                      <div class="split-config">
                        <div class="config-description">
                          <p>分单配置：源业务流的一个实例将创建多个目标业务流实例</p>
                        </div>
                        <div class="config-diagram">
                          <div class="source-flow-box">源业务流实例</div>
                          <div class="arrow-split">
                            <el-icon><arrow-right /></el-icon>
                            <el-icon><arrow-right /></el-icon>
                            <el-icon><arrow-right /></el-icon>
                          </div>
                          <div class="target-flow-boxes">
                            <div class="target-flow-box">目标业务流实例1</div>
                            <div class="target-flow-box">目标业务流实例2</div>
                            <div class="target-flow-box">目标业务流实例3</div>
                          </div>
                        </div>
                        <div class="split-conditions">
                          <h4>分单条件：</h4>
                          <el-form label-width="120px">
                            <el-form-item label="分单字段">
                              <el-select v-model="splitField" placeholder="选择分单字段">
                                <el-option label="客户类型" value="customerType" />
                                <el-option label="产品类别" value="productCategory" />
                                <el-option label="区域" value="region" />
                              </el-select>
                            </el-form-item>
                            <el-form-item label="分单规则">
                              <el-radio-group v-model="splitRule">
                                <el-radio label="equal">相等</el-radio>
                                <el-radio label="contain">包含</el-radio>
                                <el-radio label="custom">自定义</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-form>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="合并" name="merge">
                    <div class="config-content">
                      <div class="merge-config">
                        <div class="config-description">
                          <p>合并配置：源业务流的多个实例将创建一个目标业务流实例</p>
                        </div>
                        <div class="config-diagram">
                          <div class="source-flow-boxes">
                            <div class="source-flow-box">源业务流实例1</div>
                            <div class="source-flow-box">源业务流实例2</div>
                            <div class="source-flow-box">源业务流实例3</div>
                          </div>
                          <div class="arrow-merge">
                            <el-icon><arrow-right /></el-icon>
                            <el-icon><arrow-right /></el-icon>
                            <el-icon><arrow-right /></el-icon>
                          </div>
                          <div class="target-flow-box">目标业务流实例</div>
                        </div>
                        <div class="merge-conditions">
                          <h4>合并条件：</h4>
                          <el-form label-width="120px">
                            <el-form-item label="合并字段">
                              <el-select v-model="mergeField" placeholder="选择合并字段">
                                <el-option label="订单号" value="orderId" />
                                <el-option label="客户ID" value="customerId" />
                                <el-option label="项目编号" value="projectId" />
                              </el-select>
                            </el-form-item>
                            <el-form-item label="合并规则">
                              <el-radio-group v-model="mergeRule">
                                <el-radio label="allComplete">全部完成</el-radio>
                                <el-radio label="anyComplete">任一完成</el-radio>
                                <el-radio label="custom">自定义</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-form>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </template>
            <el-empty v-else description="请先在步骤一中选择业务流" />
          </div>
        </div>
        
        <div class="step-footer">
          <el-button @click="prevStep" v-if="activeStep > 0">上一步</el-button>
          <el-button type="primary" @click="nextStep" v-if="activeStep < 2">下一步</el-button>
          <el-button type="success" @click="finishSteps" v-if="activeStep === 2">完成</el-button>
          <el-button @click="cancelSteps">取消</el-button>
        </div>
      </div>
    </el-dialog>
    
    <!-- 配置业务流对话框 -->
    <el-dialog
      v-model="configFlowDialogVisible"
      title="执行业务流设置"
      width="60%"
      destroy-on-close
    >
      <div class="config-container">
        <el-tabs v-model="configActiveTab">
          <el-tab-pane label="关联前置业务流" name="relatedPrevFlows">
            <div class="related-flows-tab">
              <div class="tab-header">
                <el-button type="primary" size="small" @click="showAddPrevRelatedFlow">添加关联前置业务流</el-button>
              </div>
              <el-table :data="prevRelatedFlowsList" border stripe>
                <el-table-column prop="name" label="业务流名称" />
                <el-table-column prop="relationshipType" label="关系类型">
                  <template #default="scope">
                    <el-tag 
                      :type="scope.row.relationshipType === 'oneToOne' ? 'primary' : 
                             scope.row.relationshipType === 'split' ? 'success' : 'warning'"
                    >
                      {{ 
                        scope.row.relationshipType === 'oneToOne' ? '一对一' : 
                        scope.row.relationshipType === 'split' ? '分单' : '合并' 
                      }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template #default="scope">
                    <el-button type="primary" link size="small" @click="editRelatedFlow(scope.row)">编辑</el-button>
                    <el-popconfirm
                      title="确定删除该关联业务流吗？"
                      @confirm="removeRelatedFlow(scope.row)"
                    >
                      <template #reference>
                        <el-button type="danger" link size="small">删除</el-button>
                      </template>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
              <el-empty v-if="prevRelatedFlowsList.length === 0" description="暂无关联前置业务流" />
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="关联后置业务流" name="relatedFlows">
            <div class="related-flows-tab">
              <div class="tab-header">
                <el-button type="primary" size="small" @click="showAddRelatedFlow">添加关联后置业务流</el-button>
              </div>
              <el-table :data="relatedFlowsList" border stripe>
                <el-table-column prop="name" label="业务流名称" />
                <el-table-column prop="relationshipType" label="关系类型">
                  <template #default="scope">
                    <el-tag 
                      :type="scope.row.relationshipType === 'oneToOne' ? 'primary' : 
                             scope.row.relationshipType === 'split' ? 'success' : 'warning'"
                    >
                      {{ 
                        scope.row.relationshipType === 'oneToOne' ? '一对一' : 
                        scope.row.relationshipType === 'split' ? '分单' : '合并' 
                      }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template #default="scope">
                    <el-button type="primary" link size="small" @click="editRelatedFlow(scope.row)">编辑</el-button>
                    <el-popconfirm
                      title="确定删除该关联业务流吗？"
                      @confirm="removeRelatedFlow(scope.row)"
                    >
                      <template #reference>
                        <el-button type="danger" link size="small">删除</el-button>
                      </template>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
              <el-empty v-if="relatedFlowsList.length === 0" description="暂无关联后置业务流" />
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="参数配置" name="parameters">
            <div class="parameters-tab">
              <div class="tab-header">
                <el-button type="primary" size="small" @click="addParameter">添加参数</el-button>
              </div>
              <el-table :data="parametersList" border stripe>
                <el-table-column prop="name" label="参数名称" />
                <el-table-column prop="type" label="参数类型" />
                <el-table-column prop="defaultValue" label="默认值" />
                <el-table-column prop="description" label="描述" />
                <el-table-column label="操作" width="200">
                  <template #default="scope">
                    <el-button type="primary" link size="small" @click="editParameter(scope.row)">编辑</el-button>
                    <el-popconfirm
                      title="确定删除该参数吗？"
                      @confirm="removeParameter(scope.row)"
                    >
                      <template #reference>
                        <el-button type="danger" link size="small">删除</el-button>
                      </template>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
              <el-empty v-if="parametersList.length === 0" description="暂无参数配置" />
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="执行设置" name="executionSettings">
            <div class="execution-settings-tab">
              <el-form :model="executionSettings" label-width="120px">
                <el-form-item label="触发方式">
                  <el-select v-model="executionSettings.triggerMode" placeholder="请选择触发方式" style="width: 100%">
                    <el-option label="手动触发" value="manual" />
                    <el-option label="事件触发" value="event" />
                    <el-option label="定时触发" value="scheduled" />
                  </el-select>
                </el-form-item>
                <el-form-item label="执行超时(秒)" v-if="executionSettings.triggerMode !== 'manual'">
                  <el-input-number v-model="executionSettings.timeout" :min="0" />
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // ... (existing code)
};
</script>

<style>
  /* ... (existing styles) */
</style>