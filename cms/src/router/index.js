import Vue from "vue";
import VueRouter from "vue-router";
import {store} from '../store'
import claims from '../util/claims'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path : "/home",
    name : "Home",
    component: () => import("../views/Home.vue"),
    meta : {
      requiresAuth : true,
      requiresClaim : null
    }
  },
  {
    path : "*",
    name : "NotFound",
    component : () => import("../views/fallback/NotFound.vue")
  },
  {
    path : "/admin",
    name : "Admin",
    component : () => import("../views/admin/Admin.vue"),
    meta : {
      requiresAuth : true,
      requiresClaim : ["Admin"]
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let requiredClaim = -1;
  if(to.matched.some(record => {requiredClaim = record.meta.requiresClaim; return record.meta.requiresAuth; } )) {
    if (store.getters.hasToken) {
      if (requiredClaim == null) {
        next()
        return
      }
      else if(requiredClaim != null) {
     
          requiredClaim.forEach(element => {
            if(claims.hasClaim(element, store.getters.getToken)) {
              next()
              return
            }
          });
     
      }
      else {
        from()
      }

      
    }else {
      next('/')
    }

  } else {
    next() 
  }
})

export default router;
