<template>
    <el-dialog v-if="getScope" title="Удалить пользователя" :visible.sync="isDeleteModalVisible" width="30%" :before-close="handleClose">
      <span>Вы собираетесь удалить пользователя <b>{{ getScope.row.name }}</b>, подтвердите действие:</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Отмена</el-button>
        <el-button type="danger" @click="handleDelete(getScope.$index, getScope.row.name)">Удалить</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    methods: {
      ...mapActions(['setModalDeleteVisible']),
      ...mapMutations(['deleteUser']),
      handleDelete(index, name) {
      this.deleteUser(index)
      this.setModalDeleteVisible(false)
      this.$message({
        message: `Пользователь ${name} успешно удалён`,
        type: 'success'
      })
    },
    handleClose() {
      this.setModalDeleteVisible(false)
    }
  },
  computed: {
    ...mapGetters(['getScope', 'isDeleteModalVisible'])
  },
  data() {
    return {
      // deleteDialogVisible: this.isDeleteModalVisible
    }
  }
}
</script>