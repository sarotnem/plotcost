export default {
    state: {
        items: []
    },
    getters: {
        getFiles: state => {
            return state.items
        },
        getFilesWithClass60: state => {
            return state.items.filter(item => item.class === '60')
        },
        getFilesWithClass90: state => {
            return state.items.filter(item => item.class === '90')
        }
    },
    mutations: {
        ADD_FILE: (state, file) => {
            state.items.push(file)
        },
        REMOVE_FILE: (state, file) => {
            state.items.splice(state.items.findIndex(x => x.name === file.name), 1)
        },
        CHANGE_FILE_COPIES: (state, { file, newCopies }) => {
            // console.log(newCopies)
            state.items.find(x => x.name === file.name).copies = parseInt(newCopies)
        }
    },
    actions: {
        addFile: ({commit}, file) => {
            commit("ADD_FILE", file)
        },
        removeFile: ({commit}, file) => {
            commit("REMOVE_FILE", file)
        },
        changeFileCopies: ({commit}, {file, newCopies}) => {
            commit("CHANGE_FILE_COPIES", { file, newCopies })
        }
    }
}