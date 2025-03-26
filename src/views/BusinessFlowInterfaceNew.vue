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
                <el-form-item label="失败重试" v-if="executionSettings.triggerMode !== 'manual'">
                  <el-switch v-model="executionSettings.retryOnFailure" />
                </el-form-item>
                <el-form-item label="最大重试次数" v-if="executionSettings.retryOnFailure && executionSettings.triggerMode !== 'manual'">
                  <el-input-number v-model="executionSettings.maxRetries" :min="1" :max="10" />
                </el-form-item>
                <el-form-item label="权限控制">
                  <el-select v-model="executionSettings.permissionControl" placeholder="请选择权限控制方式" style="width: 100%">
                    <el-option label="所有人可执行" value="all" />
                    <el-option label="仅创建者可执行" value="creator" />
                    <el-option label="指定角色可执行" value="role" />
                  </el-select>
                </el-form-item>
                <el-form-item label="指定角色" v-if="executionSettings.permissionControl === 'role'">
                  <el-select
                    v-model="executionSettings.roles"
                    multiple
                    placeholder="请选择角色"
                    style="width: 100%"
                  >
                    <el-option label="管理员" value="admin" />
                    <el-option label="操作员" value="operator" />
                    <el-option label="查看者" value="viewer" />
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="configFlowDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveFlowConfig">保存配置</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 参数配置对话框 -->
    <el-dialog
      v-model="parameterDialogVisible"
      :title="parameterDialogType === 'add' ? '添加参数' : '编辑参数'"
      width="500px"
      destroy-on-close
    >
      <el-form :model="parameterForm" label-width="100px" ref="parameterFormRef">
        <el-form-item label="参数名称" prop="name">
          <el-input v-model="parameterForm.name" placeholder="请输入参数名称" />
        </el-form-item>
        <el-form-item label="参数类型" prop="type">
          <el-select v-model="parameterForm.type" placeholder="请选择参数类型" style="width: 100%">
            <el-option label="字符串" value="string" />
            <el-option label="数字" value="number" />
            <el-option label="布尔值" value="boolean" />
            <el-option label="日期" value="date" />
            <el-option label="对象" value="object" />
            <el-option label="数组" value="array" />
          </el-select>
        </el-form-item>
        <el-form-item label="默认值" prop="defaultValue">
          <el-input v-model="parameterForm.defaultValue" placeholder="请输入默认值" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="parameterForm.description" type="textarea" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="parameterDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveParameter">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 添加设置对话框 -->
    <el-dialog
      v-model="configDialogVisible"
      title="业务流设置"
      width="80%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      class="config-dialog"
    >
      <el-tabs v-model="configActiveTab">
        <el-tab-pane label="关联其他业务流" name="relatedFlows">
          <div class="related-flows-container">
            <div class="related-type-section">
              <h3>前置业务流</h3>
              <div class="prev-flows-list">
                <div class="flow-item" v-for="(flow, index) in prevRelatedFlowsList" :key="flow.id">
                  <div class="flow-info">
                    <span class="flow-name">{{ flow.name }}</span>
                    <span class="flow-type">({{ getRelationshipTypeText(flow.relationshipType) }})</span>
                  </div>
                  <div class="flow-actions">
                    <el-button type="primary" size="small" @click="handleConfigRelatedFlow('prev', index)">配置</el-button>
                    <el-button type="danger" size="small" @click="handleRemoveRelatedFlow('prev', index)">删除</el-button>
                  </div>
                </div>
                <el-button type="primary" @click="handleAddRelatedFlow('prev')">添加前置执行业务流</el-button>
              </div>
            </div>
            
            <div class="related-type-section">
              <h3>后置业务流</h3>
              <div class="next-flows-list">
                <div class="flow-item" v-for="(flow, index) in relatedFlowsList" :key="flow.id">
                  <div class="flow-info">
                    <span class="flow-name">{{ flow.name }}</span>
                    <span class="flow-type">({{ getRelationshipTypeText(flow.relationshipType) }})</span>
                  </div>
                  <div class="flow-actions">
                    <el-button type="primary" size="small" @click="handleConfigRelatedFlow('next', index)">配置</el-button>
                    <el-button type="danger" size="small" @click="handleRemoveRelatedFlow('next', index)">删除</el-button>
                  </div>
                </div>
                <el-button type="primary" @click="handleAddRelatedFlow('next')">添加后置执行业务流</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="参数配置" name="parameters">
          <div class="parameters-container">
            <p>参数配置内容</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="执行设置" name="executionSettings">
          <div class="execution-settings-container">
            <p>执行设置内容</p>
          </div>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="configDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveConfigSettings">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加/编辑关联业务流对话框 -->
    <el-drawer
      v-model="relatedFlowDialogVisible"
      :title="relatedFlowDialogTitle"
      direction="btt"
      size="80%"
      :destroy-on-close="true"
    >
      <el-steps :active="activeStep" finish-status="success" simple>
        <el-step title="选择业务流"></el-step>
        <el-step title="SIPOC映射"></el-step>
        <el-step title="分单/合并配置"></el-step>
      </el-steps>
      
      <div class="drawer-content">
        <!-- 步骤1：选择业务流 -->
        <div v-if="activeStep === 0" class="step-content">
          <div class="search-box">
            <el-input v-model="flowSearchKeyword" placeholder="请输入关键词搜索" prefix-icon="Search" clearable @input="filterAvailableFlows"></el-input>
            <el-select v-model="flowStatusFilter" placeholder="业务流状态" clearable @change="filterAvailableFlows">
              <el-option label="已发布" value="published"></el-option>
              <el-option label="草稿" value="draft"></el-option>
            </el-select>
          </div>
          
          <el-table
            ref="flowSelectTable"
            :data="filteredAvailableFlows"
            highlight-current-row
            @current-change="handleFlowSelectionChange"
            style="width: 100%; margin-top: 20px;"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="业务流名称" min-width="180"></el-table-column>
            <el-table-column prop="owner" label="所有者"></el-table-column>
            <el-table-column prop="framework" label="归属流程框架" min-width="150"></el-table-column>
            <el-table-column prop="version" label="版本号"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="scope.row.status === 'published' ? 'success' : 'info'">
                  {{ scope.row.status === 'published' ? '已发布' : '草稿' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" min-width="150"></el-table-column>
          </el-table>
          
          <el-pagination
            v-model:current-page="currentFlowPage"
            v-model:page-size="flowPageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next"
            :total="filteredAvailableFlows.length"
            @size-change="handleFlowSizeChange"
            @current-change="handleFlowCurrentChange"
            style="margin-top: 16px; text-align: right;"
          >
          </el-pagination>
        </div>
        
        <!-- 步骤2：SIPOC映射 -->
        <div v-if="activeStep === 1" class="step-content sipoc-mapping">
          <div class="mapping-header">
            <div class="source-flow">
              <h4>{{ relatedFlowType === 'prev' ? '前置业务流' : '当前业务流' }}</h4>
              <p>{{ selectedFlows.length > 0 ? selectedFlows[0].name : '' }}</p>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="target-flow">
              <h4>{{ relatedFlowType === 'prev' ? '当前业务流' : '后置业务流' }}</h4>
              <p>{{ currentFlow ? currentFlow.name : '' }}</p>
            </div>
          </div>
          
          <div class="interface-type">
            <span class="label">接口类型：</span>
            <el-radio-group v-model="interfaceType">
              <el-radio label="input">作为输入</el-radio>
              <el-radio label="control">作为方案</el-radio>
            </el-radio-group>
          </div>
          
          <div class="mapping-content">
            <h4>SIPOC映射配置</h4>
            <el-table
              :data="inputMappings"
              border
              style="width: 100%"
            >
              <el-table-column label="来源数据对象" min-width="200">
                <template #default="scope">
                  <el-select v-model="scope.row.sourceInput" placeholder="选择数据对象" style="width: 100%">
                    <el-option
                      v-for="item in sourceInputOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="目标数据对象" min-width="200">
                <template #default="scope">
                  <el-select v-model="scope.row.targetInput" placeholder="选择数据对象" style="width: 100%">
                    <el-option
                      v-for="item in targetInputOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button type="danger" size="small" @click="removeInputMapping(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <div class="table-actions" style="margin-top: 10px; margin-bottom: 20px;">
              <el-button type="primary" size="small" @click="addInputMapping">添加映射</el-button>
            </div>
          </div>
        </div>
        
        <!-- 步骤3：分单/合并配置 -->
        <div v-if="activeStep === 2" class="step-content split-merge-config">
          <el-tabs v-model="splitMergeActiveTab">
            <el-tab-pane label="一对一" name="oneToOne">
              <div class="one-to-one-config">
                <h4>一对一触发配置</h4>
                <div class="form-item">
                  <span class="label">触发模式：</span>
                  <el-radio-group v-model="oneToOneTriggerMode">
                    <el-radio label="automatic">自动触发</el-radio>
                    <el-radio label="manual">手动触发</el-radio>
                  </el-radio-group>
                </div>
                <div class="form-item" v-if="oneToOneTriggerMode === 'automatic'">
                  <span class="label">触发条件：</span>
                  <el-radio-group v-model="oneToOneTriggerCondition">
                    <el-radio label="completed">前置业务流完成后</el-radio>
                    <el-radio label="started">前置业务流启动后</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="分单" name="split">
              <div class="split-config">
                <h4>分单配置</h4>
                <div class="form-item">
                  <span class="label">分单字段：</span>
                  <el-select v-model="splitField" placeholder="选择字段" style="width: 300px">
                    <el-option
                      v-for="item in splitFieldOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label">分单规则：</span>
                  <el-radio-group v-model="splitRule">
                    <el-radio label="group">分组</el-radio>
                    <el-radio label="equal">平均</el-radio>
                    <el-radio label="expression">表达式</el-radio>
                  </el-radio-group>
                </div>
                <div class="form-item" v-if="splitRule === 'expression'">
                  <span class="label">分单表达式：</span>
                  <el-input v-model="splitExpression" placeholder="请输入分单表达式" style="width: 400px"></el-input>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="合并" name="merge">
              <div class="merge-config">
                <h4>合并配置</h4>
                <div class="form-item">
                  <span class="label">合并字段：</span>
                  <el-select v-model="mergeField" placeholder="选择字段" style="width: 300px">
                    <el-option
                      v-for="item in mergeFieldOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label">合并规则：</span>
                  <el-radio-group v-model="mergeRule">
                    <el-radio label="allComplete">全部完成</el-radio>
                    <el-radio label="anyComplete">任一完成</el-radio>
                    <el-radio label="countComplete">指定数量完成</el-radio>
                  </el-radio-group>
                </div>
                <div class="form-item" v-if="mergeRule === 'countComplete'">
                  <span class="label">完成数量：</span>
                  <el-input-number v-model="mergeCount" :min="1" :max="100"></el-input-number>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      
      <div class="drawer-footer">
        <el-button @click="handlePrevStep" v-if="activeStep > 0">上一步</el-button>
        <el-button type="primary" @click="handleNextStep" v-if="activeStep < 2">下一步</el-button>
        <el-button type="primary" @click="saveRelatedFlow" v-if="activeStep === 2">保存</el-button>
        <el-button @click="relatedFlowDialogVisible = false">取消</el-button>
      </div>
    </el-drawer>

    <!-- 删除确认对话框 -->
    <el-dialog
      v-model="deleteConfirmVisible"
      title="确认删除"
      width="30%"
    >
      <div class="confirm-content">
        <p>您确定要删除本业务流与"{{ flowToDelete ? flowToDelete.name : '' }}"的关联关系吗？</p>
        <p class="warning">⚠️ 删除后将导致：</p>
        <ul>
          <li>SIPOC映射、分单合并等配置将被被清除</li>
          <li>业务流间数据传递将中断</li>
        </ul>
        <p class="warning">此操作不可撤销，请谨慎操作！</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteConfirmVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmDeleteRelatedFlow">确认删除</el-button>
        </span>
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

// 设计业务流
const handleDesign = (row) => {
  ElMessage.success(`即将跳转到设计页面：${row.name}`)
  // 实际项目中应该跳转到设计页面
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

// 查看版本
const handleVersion = (row) => {
  ElMessage.success(`查看版本历史：${row.name}`)
  // 实际项目中应该跳转到版本历史页面或显示版本历史对话框
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


// 配置对话框相关方法和变量
const configDialogVisible = ref(false)
const configActiveTab = ref("relatedFlows")
const currentFlow = ref(null)

// 关联业务流变量
const relatedFlowType = ref("next") // "prev" 或 "next"
const activeStep = ref(0)
const relatedFlowDialogVisible = ref(false)
const relatedFlowDialogTitle = ref("添加关联业务流")

// 关联业务流列表
const relatedFlowsList = ref([]
)

// 前置业务流列表
const prevRelatedFlowsList = ref([
  { id: "301", name: "需求收集流程", relationshipType: "oneToOne" },
  { id: "302", name: "客户资质审核", relationshipType: "merge" }
])

// 业务流选择相关
const flowSearchKeyword = ref("")
const flowStatusFilter = ref("")
const filteredAvailableFlows = ref([])
const availableFlows = ref([])
const currentFlowPage = ref(1)
const flowPageSize = ref(10)
const selectedFlows = ref([])

// SIPOC映射相关
const interfaceType = ref("input")
const sourceInputOptions = ref([
  { label: "客户信息", value: "客户信息" },
  { label: "订单信息", value: "订单信息" },
  { label: "产品信息", value: "产品信息" },
])
const sourceOutputOptions = ref([
  { label: "处理结果", value: "处理结果" },
  { label: "发票信息", value: "发票信息" },
  { label: "配送计划", value: "配送计划" },
])
const inputMappings = ref([{ sourceInput: "", targetInput: "" }])
const outputMappings = ref([{ sourceOutput: "", targetOutput: "" }])

// 分单/合并配置相关
const splitMergeActiveTab = ref("oneToOne")
const oneToOneTriggerMode = ref("automatic")
const oneToOneTriggerCondition = ref("completed")

// 分单配置
const splitField = ref("")
const splitRule = ref("group")
const splitExpression = ref("")
const splitFieldOptions = ref([
  { label: "客户ID", value: "customerId" },
  { label: "订单类型", value: "orderType" },
  { label: "产品类别", value: "productCategory" },
])

// 合并配置
const mergeField = ref("")
const mergeRule = ref("allComplete")
const mergeCount = ref(1)
const mergeFieldOptions = ref([
  { label: "客户ID", value: "customerId" },
  { label: "订单编号", value: "orderId" },
  { label: "项目编号", value: "projectId" },
])

// 删除确认对话框
const deleteConfirmVisible = ref(false)
const flowToDelete = ref(null)

// 参数配置相关
const parameterDialogVisible = ref(false)
const parameterDialogType = ref("add") // "add" 或 "edit"
const currentParameterId = ref(null)
const parameterForm = reactive({
  name: "",
  type: "",
  defaultValue: "",
  description: ""
})
const parametersList = ref([
  { id: "1", name: "customerId", type: "string", defaultValue: "", description: "客户ID" },
  { id: "2", name: "orderId", type: "string", defaultValue: "", description: "订单编号" }
])
const parameterTypeOptions = [
  { label: "字符串", value: "string" },
  { label: "数字", value: "number" },
  { label: "布尔值", value: "boolean" },
  { label: "日期", value: "date" },
  { label: "对象", value: "object" },
  { label: "数组", value: "array" }
]

// 执行配置相关
const executionSettings = reactive({
  autoStart: false,
  timeoutMinutes: 60,
  retryCount: 0,
  retryInterval: 5
})

// 配置流程框架相关
const configFlowDialogVisible = ref(false)

// 定义保存配置的方法
const saveFlowConfig = () => {
  // 实际项目中应该调用API保存整体配置
  ElMessage.success("业务流配置已保存")
  configFlowDialogVisible.value = false
}

</script>

<style>
/* 直接导入外部CSS文件 */
@import url("../views/BusinessFlowInterfaceNewStyle.css");

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
  color: #409EFF;
  font-size: 22px;
  font-weight: bold;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
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

.menu-icon {
  width: 18px;
  height: 18px;
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

.create-button-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.normal-create-btn {
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
}

.search-area {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
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

.cdt-input {
  flex: 1;
}

.cdt-input__wrapper {
  box-shadow: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 32px;
  padding: 0 11px;
}

.cdt-input__inner {
  height: 30px;
  border: none;
  outline: none;
  padding: 0;
  width: 100%;
  color: #606266;
  font-size: 14px;
}

.cdt-input__inner::placeholder {
  color: #c0c4cc;
}

.custom-select {
  width: 100%;
}

.date-range-wrapper {
  width: 100%;
}

.custom-date-picker {
  width: 100%;
}

.action-buttons {
  justify-content: flex-end;
  gap: 12px;
}

.table-container {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
}

.flow-name {
  font-weight: 500;
  color: #303133;
}

.operation-btns {
  display: flex;
  gap: 8px;
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

/* 修复Element Plus组件样式 */
:deep(.el-input__wrapper) {
  box-shadow: none;
  border: 1px solid #dcdfe6;
  height: 32px;
  padding: 0 11px;
}

:deep(.el-input__inner) {
  height: 30px;
  color: #606266;
  font-size: 14px;
}

:deep(.el-select__wrapper) {
  box-shadow: none;
  border: 1px solid #dcdfe6;
  height: 32px;
  padding: 0 11px;
}

:deep(.el-input__suffix) {
  height: 30px;
  line-height: 30px;
}

:deep(.el-date-editor.el-input__wrapper) {
  box-shadow: none;
  border: 1px solid #dcdfe6;
  height: 32px;
  padding: 0 11px;
}

:deep(.el-range-separator) {
  line-height: 30px;
}

:deep(.el-date-editor .el-range-input) {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}

:deep(.el-dropdown-menu) {
  min-width: 100px;
}

:deep(.el-drawer__header) {
  margin-right: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-drawer__title) {
  font-size: 16px;
  font-weight: 500;
}
</style>
