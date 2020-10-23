export default {
    actions: {
        setModalDeleteVisible(ctx, flag) {
            ctx.commit('setDeleteVisible', flag)
        },
        setModalSaveVisible(ctx, flag) {
            ctx.commit('setSaveVisible', flag)
        }
    },
    mutations: {
        setDeleteVisible(state, flag) {
            state.modal.deleteModalVisible = flag
        },
        setSaveVisible(state, flag) {
            state.modal.saveModalVisible = flag
        }
    },
    state: {
        modal: {
            deleteModalVisible: false,
            saveModalVisible: false
        }
    },
    getters: {
        isDeleteModalVisible(state) {
            return state.modal.deleteModalVisible
        },
        isSaveModalVisible(state) {
            return state.modal.saveModalVisible
        }
    }
}