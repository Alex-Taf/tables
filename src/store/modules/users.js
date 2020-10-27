export default {
    actions: {
        async fetchUsers(ctx) {
            await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => { 
                let users = json
                ctx.commit('loadUsers', users)
                ctx.commit('isLoaded', true)
            })
        },
        setCurrentScope(ctx, scope) {
            ctx.commit('setScope', scope)
        }
    },
    mutations: {
        loadUsers(state, users) {
            state.users = users 
        },
        isLoaded(state, flag) {
            state.isLoading = !flag
        },
        setScope(state, scope) {
            state.scope = scope
        },
        saveUserData(state, userData) {
            state.users[userData.index].name = userData.name
            state.users[userData.index].username = userData.username
            state.users[userData.index].email = userData.email
            state.users[userData.index].phone = userData.phone
        },
        addUserData(state, userData) {
            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify({
                    id: userData.id,
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    phone: userData.phone
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(response => response.json())
              .then(json => { state.users.push(json) })
        },
        deleteUser(state, id) {
            state.users.splice(id, 1)
        }
    },
    state: {
        scope: null,
        users: [],
        isLoading: true
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getUserById: state => id => {
            return state.users.find(user => user.id == id);
        },
        getLoadingStatus(state) {
            return state.isLoading
        },
        getScope(state) {
            return state.scope
        }
    }
}