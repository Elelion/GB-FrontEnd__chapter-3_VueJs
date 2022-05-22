import Vue from "vue";
import Router from "vue-router";

import HomeView from "@/views/HomeView";
import AboutView from "@/views/about/AboutView";
import NotFoundView from "@/views/NotFoundView";
import AddPaymentFormView from "@/views/AddPaymentFormView";

Vue.use(Router)

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: HomeView,
  },
  // {
  //   path: "/:page",
  //   name: "dashboard",
  //   component: HomeView,
  // },
  {
    // about* - и все что дальше, те about/test итп
    path: "/about*",
    name: "AboutView",
    component: AboutView,
  },
  {
    path: "/notfound",
    name: "NotFoundView",
    component: NotFoundView,
  },
  {
    path: "/add/payment",
    name: "AddPaymentFormView",
    component: AddPaymentFormView,
  },
  {
    // * - все страницы НЕ удовлетворяющие условия. !Важно! всегда в конце!
    path: "*",
    // name: "NotFoundView",
    // component: NotFoundView,

    // редирект
    redirect: {name: 'NotFoundView'}
  }
];

// export default new Router({
const router = new Router({
  mode: "history",
  routes
});

// авторизованный пользователь
const usersAuthExist = false;

/**
 * хуки жизненного цикла
 *
 * куда, от куда, и ф-ция next
 *
 * next - если все условия выполнены, то закончить переход
 */
router.beforeEach((to, from, next) => {
  if (to.name !== 'about' && !usersAuthExist) {
    // если пользаватель НЕ авторизован, то кинь его на 404
    next({'name': 'notfound'})
  }
  else {
    next()
  }
})

// отработает тогда, когда выполнится next() тот что выше
router.beforeResolve((to, from, next) => {
  console.log(to, from)
  next();
});

const getTitleByRouteName = (routerName) => {
  return {
    'dashboard': 'dashB',
    'about': 'Ab',
    'notfound': 'err 404',
  }[routerName];
}

// отрабатывает уже когда перешли по next()
router.afterEach((to, from) => {
  document.title = getTitleByRouteName(to.name);
  console.log(from);
})

export default router;