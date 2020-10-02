import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import formView from '@/formView.vue'

import oneNewView from '@/oneNewView.vue'

Vue.use(Router)

export default new Router({
  routes: [
		  {
		  path: '/',
		  name: 'formView',
		  component: formView
		},
		{
		  path: '/oneNewView',
		  name: 'oneNewView',
		  component: oneNewView
		},
  ]
})
