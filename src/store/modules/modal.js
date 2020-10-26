export default {
    actions: {
        setModalDeleteVisible(ctx, flag) {
            ctx.commit('setDeleteVisible', flag)
        },
        setModalSaveVisible(ctx, flag) {
            ctx.commit('setSaveVisible', flag)
        },
        setModalAddVisible(ctx, flag) {
            ctx.commit('setAddVisible', flag)
        }
    },
    mutations: {
        setDeleteVisible(state, flag) {
            state.modal.deleteModalVisible = flag
        },
        setSaveVisible(state, flag) {
            state.modal.saveModalVisible = flag
        },
        setAddVisible(state, flag) {
            state.modal.addModalVisible = flag
        }
    },
    state: {
        modal: {
            deleteModalVisible: false,
            saveModalVisible: false,
            addModalVisible: false
        }
    },
    getters: {
        isDeleteModalVisible(state) {
            return state.modal.deleteModalVisible
        },
        isSaveModalVisible(state) {
            return state.modal.saveModalVisible
        },
        isAddModalVisible(state) {
            return state.modal.addModalVisible
        }
    }
}