import Vue from "vue";
import Vuex from "vuex";
import jwt from "../util/claims"

Vue.use(Vuex);

const menuModule = {
  state: {
    menu: [
      {
        header: true,
        title: "Vue CMS |",
        hiddenOnCollapse: true,
        hidden : false
      },
      {
        title: "Admin Panel",
        href: "/admin",
        icon: "fas fa-columns",
        hidden: true,
        isAdmin: true
      }
    ]
  },
  mutations: {
    mutateAdminPanels(state, payload) {
      state.menu.forEach(element => {
        if (typeof element.isAdmin == 'undefined') 
        {
          if(typeof element.header != 'undefined' && element.header)
            element.hidden = false
          else
            element.hidden = true
        }
        else if (element.isAdmin) {
          element.hidden = payload
        }
        else {
          element.hidden = !payload
        }
      });
    },
    mutateTitle(state, payload) {
      state.menu.forEach(element => {
        if(typeof element.header != 'undefined' && element.header) {
            element.title = `Vue CMS | ${jwt.getSubject(payload)}`
        }
      })
    }
  },
  actions: {
    showAdminRelated({ commit }, payload) {
      commit(payload)
    }
  },
  getters: {
    getMenu: state => state.menu,
    getNotAdmin: state => state.notAdmin
  }


}


export const store = new Vuex.Store({
  state: {
    token: "",
    menuVisible: false,
    admin: false,
  },
  mutations: {
    mutateToken(state, payload) {
      state.token = `Bearer ${payload}`
    },
    mutateMenu(state, payload) {
      state.menuVisible = payload
    },
    mutateAdmin(state, payload) {
      state.admin = payload
    }
  },
  actions: {
    async authenticate({ commit }, user) {
      await Vue.prototype.$http.post("login", {
        name: user.user,
        password: user.pw
      }).then(res => {
        if (res.data.token) {
          commit('mutateToken', res.data.token)

          user.callback(res.data.token)
          commit('mutateMenu', true)
          
        }
        else {
          Vue.$toast.error(res.data.status)
          commit('mutateMenu', false)
        }
      }).catch(err => {
        Vue.$toast.error(err.message)
        console.error(err.message)
        commit('mutateMenu', false)

      })

    },
    grantAdmin({ commit }) {
      commit('mutateAdmin', true)
      commit('mutateAdminPanels', false)
    },
    showName({commit}, token) {
      commit('mutateTitle', token)
    } 

  },
  modules: { menuMod: menuModule },
  getters: {
    hasToken: state => !!state.token,
    getToken: state => state.token,
    menu: state => state.menuMod.menu,
    isAdmin: state => state.admin,
    hiddenFromUser: state => !state.admin
  }
});

