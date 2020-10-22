export default {
    actions: {
        async fetchUsers(ctx) {
            await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => { 
                let users = json
                ctx.commit('loadUsers', users)
                ctx.commit('isLoaded', true)
                ctx.commit('setPageCount', users)
            })
          }
    },
    mutations: {
        loadUsers(state, users) {
            state.users = users 
        },
        isLoaded(state, flag) {
            state.isLoading = !flag
        },
        setPageCount(state, users) {
            state.pagination.pageCount = Math.ceil(users.length / 3)
        },
        setCurrentPage(state, val) {
            state.pagination.currentPage = val
        },
        saveUserData(state, userData) {
            state.users[userData.index].name = userData.name
            state.users[userData.index].username = userData.username
            state.users[userData.index].email = userData.email
            state.users[userData.index].phone = userData.phone
        },
        deleteUser(state, id) {
            state.users.splice(id, 1)
        }
    },
    state: {
        users: [],
        isLoading: true,
        pagination: {
            pageCount: 0,
            currentPage: 1
        }
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getLoadingStatus(state) {
            return state.isLoading
        },
        getPageCount(state) {
            return state.pagination.pageCount
        },
        getCurrentPage(state) {
            return state.pagination.currentPage
        }
    }
}