import TrelloBoardView from '@/components/templates/TrelloBoardView.vue'
import TrelloLoginView from '@/components/templates/TrelloLoginView.vue'
import TrelloTaskDetailModal from '@/components/templates/TrelloTaskDetailModal'

export default [{
  path: '/',
  component: TrelloBoardView,
  meta: { requiresAuth: true }
}, {
  path: '/login',
  component: TrelloLoginView
}, {
  path: '/tasks/:id',
  component: TrelloTaskDetailModal,
  meta: { requiresAuth: true }
}, {
  path: '*',
  redirect: '/'
}]
