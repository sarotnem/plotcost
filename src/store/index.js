import Vue from 'vue'
import Vuex from 'vuex'
import files from './modules/files'
import cost from './modules/cost'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        files,
        cost
    }
})