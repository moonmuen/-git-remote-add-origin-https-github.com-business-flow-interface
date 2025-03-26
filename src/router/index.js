import { createRouter, createWebHistory } from 'vue-router'
import BusinessFlowInterface from '../views/BusinessFlowInterface.vue'
import BusinessFlowOriginal from '../views/BusinessFlowInterface.original.vue'
import BusinessFlowInterfaceSteps from '../views/BusinessFlowInterfaceSteps.vue'
import BusinessFlowVersionCompare from '../views/BusinessFlowVersionCompare.vue'
import BusinessFlowInterfaceNew from '../views/BusinessFlowInterfaceNew.vue'
import BusinessFlowInterfaceNewImproved from '../views/BusinessFlowInterfaceNewImproved.vue'

// 获取当前环境的base路径
const base = import.meta.env.BASE_URL

const routes = [
  {
    path: '/',
    redirect: '/business-flow'
  },
  {
    path: '/archive',
    name: 'VersionArchive',
    component: () => import('../views/VersionArchive.vue')
  },
  {
    path: '/compare',
    name: 'Compare',
    component: BusinessFlowVersionCompare
  },
  {
    path: '/business-flow',
    name: 'BusinessFlow',
    component: () => import('../views/BusinessFlowInterface.vue')
  },
  {
    path: '/business-flow-original',
    name: 'BusinessFlowOriginal',
    component: BusinessFlowOriginal
  },
  {
    path: '/business-flow-steps',
    name: 'BusinessFlowSteps',
    component: BusinessFlowInterfaceSteps
  },
  {
    path: '/business-flow-new',
    name: 'BusinessFlowNew',
    component: () => import('../views/BusinessFlowInterfaceNew.vue')
  },
  {
    path: '/business-flow-improved',
    name: 'BusinessFlowImproved',
    component: () => import('../views/BusinessFlowInterfaceNewImproved.vue')
  },
  {
    path: '/business-flow-fixed',
    name: 'BusinessFlowFixed',
    component: () => import('../views/BusinessFlowFixed.vue')
  }
]

const router = createRouter({
  history: createWebHistory(base),
  routes
})

export default router 