<template>
  <div class="version-compare">
    <el-card class="compare-card">
      <template #header>
        <div class="card-header">
          <h2>业务流界面版本对比</h2>
          <div class="actions">
            <el-button type="primary" @click="loadOriginalVersion">查看原始版本</el-button>
            <el-button type="success" @click="loadOptimizedVersion">查看优化版本</el-button>
            <el-button type="warning" @click="loadStepsVersion">查看步骤式版本</el-button>
            <el-button type="danger" @click="loadPrototypeVersion">查看原型设计版本</el-button>
          </div>
        </div>
      </template>
      
      <div class="compare-content">
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="功能对比" name="features">
            <div class="features-comparison">
              <h3>功能特性对比</h3>
              <el-table :data="comparisonData" border style="width: 100%">
                <el-table-column prop="feature" label="功能特性" width="200" />
                <el-table-column prop="original" label="原始版本">
                  <template #default="scope">
                    <el-tag 
                      :type="scope.row.original === '支持' ? 'success' : scope.row.original === '部分支持' ? 'warning' : 'info'"
                      effect="plain"
                    >
                      {{ scope.row.original }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="optimized" label="优化版本">
                  <template #default="scope">
                    <el-tag 
                      :type="scope.row.optimized === '支持' ? 'success' : scope.row.optimized === '部分支持' ? 'warning' : 'info'"
                      effect="plain"
                    >
                      {{ scope.row.optimized }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="prototype" label="原型设计版本">
                  <template #default="scope">
                    <el-tag 
                      :type="scope.row.prototype === '支持' ? 'success' : scope.row.prototype === '部分支持' ? 'warning' : 'info'"
                      effect="plain"
                    >
                      {{ scope.row.prototype }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="description" label="功能描述" />
              </el-table>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="界面对比" name="ui">
            <div class="ui-comparison">
              <div class="comparison-row">
                <div class="comparison-col">
                  <h3>原始界面</h3>
                  <div class="screenshot">
                    <div class="ui-image placeholder-image">原始界面图片</div>
                    <div class="overlay">
                      <p>原始版本使用简单布局，基础表格展示，没有搜索和分页功能</p>
                    </div>
                  </div>
                </div>
                <div class="comparison-col">
                  <h3>优化界面</h3>
                  <div class="screenshot">
                    <div class="ui-image placeholder-image">优化界面图片</div>
                    <div class="overlay">
                      <p>优化版本使用卡片布局，美观的表格展示，支持搜索、分页和更多操作</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="comparison-row" style="margin-top: 20px;">
                <div class="comparison-col">
                  <h3>步骤式界面</h3>
                  <div class="screenshot">
                    <div class="ui-image placeholder-image">步骤式界面图片</div>
                    <div class="overlay">
                      <p>步骤式版本使用步骤条引导用户完成配置，提供更清晰的操作流程</p>
                    </div>
                  </div>
                </div>
                <div class="comparison-col">
                  <h3>原型设计界面</h3>
                  <div class="screenshot">
                    <div class="ui-image placeholder-image">原型设计界面图片</div>
                    <div class="overlay">
                      <p>原型设计版本完全符合设计规范，包含完整的菜单结构和业务功能</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="交互对比" name="interaction">
            <div class="interaction-comparison">
              <h3>交互流程对比</h3>
              <el-table :data="interactionData" border style="width: 100%">
                <el-table-column prop="scenario" label="场景" width="200" />
                <el-table-column prop="originalFlow" label="原始版本流程" />
                <el-table-column prop="optimizedFlow" label="优化版本流程" />
                <el-table-column prop="improvement" label="改进点" />
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router'

const activeTab = ref('features')

// 功能对比数据
const comparisonData = ref([
  {
    feature: '业务流列表展示',
    original: '支持',
    optimized: '支持',
    prototype: '支持',
    description: '各版本均支持基础的业务流列表展示'
  },
  {
    feature: '搜索功能',
    original: '不支持',
    optimized: '支持',
    prototype: '支持',
    description: '优化版本和原型设计版本支持按名称、所有者和备注进行搜索'
  },
  {
    feature: '分页功能',
    original: '不支持',
    optimized: '支持',
    prototype: '支持',
    description: '优化版本和原型设计版本支持分页和每页显示数量调整'
  },
  {
    feature: 'SIPOC映射配置',
    original: '支持(嵌套抽屉)',
    optimized: '支持(对话框)',
    prototype: '支持(对话框)',
    description: '优化版本和原型设计版本使用对话框形式，优化UI层级'
  },
  {
    feature: '分单合并配置',
    original: '支持(嵌套抽屉)',
    optimized: '支持(对话框)',
    prototype: '支持(对话框)',
    description: '优化版本和原型设计版本使用对话框形式，优化UI层级'
  },
  {
    feature: '卡片式布局',
    original: '不支持',
    optimized: '支持',
    prototype: '支持',
    description: '优化版本和原型设计版本使用卡片布局增强视觉边界'
  },
  {
    feature: '空状态提示',
    original: '部分支持',
    optimized: '支持',
    prototype: '支持',
    description: '优化版本和原型设计版本为各种空状态提供了友好提示'
  },
  {
    feature: '操作下拉菜单',
    original: '不支持',
    optimized: '支持',
    prototype: '支持',
    description: '优化版本和原型设计版本提供了更多操作入口'
  },
  {
    feature: '分步操作引导',
    original: '不支持',
    optimized: '不支持',
    prototype: '部分支持',
    description: '步骤式版本和原型设计版本提供了操作引导'
  },
  {
    feature: '完整导航菜单',
    original: '不支持',
    optimized: '不支持',
    prototype: '支持',
    description: '原型设计版本提供了完整的应用导航菜单结构'
  },
  {
    feature: '高级筛选功能',
    original: '不支持',
    optimized: '部分支持',
    prototype: '支持',
    description: '原型设计版本支持多条件组合筛选'
  }
])

// 交互对比数据
const interactionData = ref([
  {
    scenario: '添加关联业务流',
    originalFlow: '点击添加业务流按钮 → 选择业务流 → 配置SIPOC → 配置分单合并',
    optimizedFlow: '点击添加业务流按钮 → 选择业务流 → 在对话框中配置SIPOC → 在对话框中配置分单合并',
    improvement: '使用对话框代替嵌套抽屉，减少层级嵌套，交互更清晰'
  },
  {
    scenario: '查看业务流配置',
    originalFlow: '点击设置按钮 → 在80%宽度抽屉中查看',
    optimizedFlow: '点击配置按钮 → 在60%宽度抽屉中查看，使用选项卡组织内容',
    improvement: '适当减小抽屉宽度，优化内容展示和分组'
  },
  {
    scenario: '业务流搜索',
    originalFlow: '不支持搜索，需要滚动查找',
    optimizedFlow: '输入关键字 → 自动过滤显示匹配项',
    improvement: '添加搜索功能，提高查找效率'
  },
  {
    scenario: '删除关联业务流',
    originalFlow: '点击删除按钮 → 确认 → 提示成功',
    optimizedFlow: '点击删除按钮 → 带详细警告信息的确认 → 提示成功',
    improvement: '更详细的风险提示，帮助用户做出明智决策'
  },
  {
    scenario: '添加关联业务流（步骤式）',
    originalFlow: '点击添加业务流按钮 → 选择业务流 → 配置SIPOC → 配置分单合并',
    optimizedFlow: '点击添加业务流按钮 → 通过步骤条引导用户依次完成选择业务流 → SIPOC映射 → 分单合并',
    improvement: '使用步骤条标识当前进度，固定尺寸弹窗(800px)提供一致的用户体验，使用蓝色主题保持视觉一致性'
  }
])

// 加载原始版本
const loadOriginalVersion = () => {
  ElMessage.success('正在加载原始版本界面...')
  setTimeout(() => {
    router.push('/business-flow-original')
  }, 500)
}

// 加载优化版本
const loadOptimizedVersion = () => {
  ElMessage.success('正在加载优化版本界面...')
  setTimeout(() => {
    router.push('/business-flow')
  }, 500)
}

// 加载步骤式版本
const loadStepsVersion = () => {
  ElMessage.success('正在加载步骤式版本界面...')
  setTimeout(() => {
    router.push('/business-flow-steps')
  }, 500)
}

// 加载原型设计版本
const loadPrototypeVersion = () => {
  ElMessage.success('正在加载原型设计版本界面...')
  setTimeout(() => {
    router.push('/business-flow-new')
  }, 500)
}
</script>

<style lang="scss" scoped>
.version-compare {
  padding: 20px;
  
  .compare-card {
    margin-bottom: 20px;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      h2 {
        margin: 0;
        font-size: 20px;
        color: #303133;
      }
      
      .actions {
        display: flex;
        gap: 10px;
      }
    }
    
    .compare-content {
      margin-top: 16px;
      
      .features-comparison,
      .interaction-comparison {
        h3 {
          margin-top: 0;
          margin-bottom: 16px;
          color: #606266;
          font-size: 16px;
        }
      }
      
      .ui-comparison {
        .comparison-row {
          display: flex;
          gap: 20px;
          
          .comparison-col {
            flex: 1;
            
            h3 {
              margin-top: 0;
              margin-bottom: 16px;
              color: #606266;
              font-size: 16px;
              text-align: center;
            }
            
            .screenshot {
              position: relative;
              border: 1px solid #ebeef5;
              border-radius: 4px;
              overflow: hidden;
              
              .ui-image {
                width: 100%;
                height: auto;
                display: block;
              }
              
              .placeholder-image {
                height: 200px;
                background-color: #f5f7fa;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #909399;
                font-size: 16px;
              }
              
              .overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.6);
                color: white;
                padding: 12px;
                
                p {
                  margin: 0;
                  font-size: 14px;
                  line-height: 1.5;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style> 