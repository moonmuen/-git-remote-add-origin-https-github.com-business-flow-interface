# 业务流界面优化项目

本项目展示了业务流界面的原始版本、优化版本、步骤式版本和原型设计版本，并提供了版本对比。

## 项目结构

- `src/views/BusinessFlowInterface.vue` - 优化后的业务流界面组件
- `src/views/BusinessFlowInterface.original.vue` - 原始的业务流界面组件
- `src/views/BusinessFlowInterfaceSteps.vue` - 步骤式业务流界面组件
- `src/views/BusinessFlowInterfaceNew.vue` - 基于原型设计的业务流界面组件
- `src/views/BusinessFlowVersionCompare.vue` - 多个版本的比较组件

## 安装与运行

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 在浏览器中访问：
   ```
   http://localhost:3000
   ```

## 功能对比

### 原始版本

原始版本实现了基本的业务流管理功能，具有以下特点：
- 简单的表格展示业务流列表
- 通过抽屉展示业务流配置
- 支持添加前置和后置业务流
- 支持SIPOC映射和分单合并配置

### 优化版本

优化版本在保留原有功能的基础上，进行了以下改进：
- 添加搜索功能，支持按名称、所有者和备注进行搜索
- 添加分页功能，支持调整每页显示数量
- 改进UI设计，使用卡片布局增强视觉边界
- 优化交互层级，将SIPOC映射和分单合并从嵌套抽屉改为对话框
- 减小主抽屉宽度(从80%到60%)，优化视觉体验
- 添加状态标签、类型标签和工具提示，增强信息展示
- 添加操作下拉菜单，提供更丰富的功能入口
- 优化空状态提示，提升用户体验

### 步骤式版本

步骤式版本在原始版本的基础上进行了以下改进：
- 将右侧抽屉改为中央大型弹窗
- 添加步骤导航组件，清晰展示当前操作步骤
- 固定弹窗尺寸(800px)，适配小屏幕设备
- 使用蓝色主题代替绿色，保持整体视觉一致性
- 统一各步骤弹窗的尺寸和风格
- 步骤弹窗覆盖在主弹窗上，保持交互一致性
- 添加卡片布局，增强视觉边界
- 优化表格展示，添加边框和斑马纹提升可读性

### 原型设计版本

原型设计版本完全重构了界面，基于原型设计图实现，具有以下特点：
- 完整的顶部导航和左侧菜单结构
- 符合设计规范的卡片式布局
- 多条件组合筛选功能
- 丰富的表格操作按钮
- 分页和批量操作支持
- 基于组件的内容渲染
- 统一的对话框交互风格
- 支持完整的业务流程管理，包括创建、编辑、发布、下线等操作

## 使用方法

项目启动后，默认显示版本比较页面，您可以：

1. 点击"查看原始版本"按钮，查看原始的业务流界面
2. 点击"查看优化版本"按钮，查看优化后的业务流界面
3. 点击"查看步骤式版本"按钮，查看步骤导航版本的业务流界面
4. 点击"查看原型设计版本"按钮，查看符合原型设计的业务流界面
5. 通过比较页面的功能对比、界面对比和交互对比选项卡，了解各个版本的差异

# 业务流间的接口定义

业务流间的接口定义系统，支持查看、编辑和管理各种业务流程。

## 本地开发

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 部署指南

### Vercel网站部署（推荐，无需命令行）

1. 首先将代码推送到GitHub
   ```bash
   # 在项目根目录初始化git仓库
   git init
   git add .
   git commit -m "初始提交"
   
   # 创建GitHub仓库后，关联并推送
   git remote add origin https://github.com/您的用户名/business-flow-interface.git
   git push -u origin main  # 或 master，取决于您的默认分支名称
   ```

2. 访问[Vercel官网](https://vercel.com)并注册/登录账号
   - 可以直接使用GitHub账号登录，无需单独注册

3. 在Vercel控制台中导入项目
   - 点击"Add New..."然后选择"Project"
   - 在"Import Git Repository"部分找到并选择您的GitHub仓库
   - 若看不到您的仓库，点击"Configure GitHub App"添加权限

4. 配置项目
   - 默认设置已在`vercel.json`中配置好，一般不需修改
   - Project Name: 可自定义项目名称
   - Framework Preset: 确保自动选择为"Vite"
   - 点击"Deploy"按钮开始部署

5. 部署完成后
   - Vercel会自动生成一个域名，如`business-flow-interface.vercel.app`
   - 点击"Visit"按钮查看您的网站
   - 您可以在"Domains"设置中添加自定义域名

### 注意事项

- 每次您推送到GitHub仓库，Vercel将自动重新部署
- 您可以在Vercel控制台中查看部署历史和日志
- 如需回滚到之前版本，可在"Deployments"选项卡中操作

## 访问地址

- GitHub Pages: https://<用户名>.github.io/business-flow-interface
- Vercel: 部署完成后会自动生成URL

## 技术栈

- Vue 3
- Vue Router
- Element Plus
- Vite 