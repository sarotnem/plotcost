export default {
    state: {
        costPerSqMt: "2.50"
    },
    mutations: {
        CHANGE_COST_PER_SQ_MT: (state, cost) => {
            state.costPerSqMt = cost
        }
    },
    actions: {
        changeCostPerSqMt: ({ commit }, cost) => {
            commit("CHANGE_COST_PER_SQ_MT", cost)
        }
    }
}