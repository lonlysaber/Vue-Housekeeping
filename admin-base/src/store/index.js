import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import admin from './modules/admin'
import keeper from './modules/keeper'
import order from './modules/order'
import leaveWord from './modules/leaveWord'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    admin,
    keeper,
    order,
    leaveWord
  },
  getters
})

export default store
