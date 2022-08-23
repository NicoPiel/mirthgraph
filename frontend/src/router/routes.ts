import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: '', component: () => import('pages/IndexPage.vue')}],
  },
  {
    path: '/ports',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: '', component: () => import('pages/PortPage.vue')}],
  },
  {
    path: '/3d',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: '', component: () => import('pages/3DGraphPage.vue')}],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
