<template>
    <!--Edit-->
    <el-dialog v-if="getScope" title="Изменить пользователя" :visible.sync="isSaveModalVisible" width="30%" :before-close="handleClose">
      <el-row :gutter="20" class="form-row">
        <el-col :span="4"><label>Имя</label></el-col>
        <el-col :span="19"><el-input placeholder="Имя" v-model="editDialogInputs.name" clearable></el-input></el-col>
      </el-row>
      <el-row :gutter="20" class="form-row">
        <el-col :span="4"><label>Username</label></el-col>
        <el-col :span="19"><el-input placeholder="Username" v-model="editDialogInputs.username" clearable></el-input></el-col>
      </el-row>
      <el-row :gutter="20" class="form-row">
        <el-col :span="4"><label>E-mail</label></el-col>
        <el-col :span="19"><el-input placeholder="E-mail" v-model="editDialogInputs.email" clearable></el-input></el-col>
      </el-row>
      <el-row :gutter="20" class="form-row">
        <el-col :span="4"><label>Телефон</label></el-col>
        <el-col :span="19"><el-input placeholder="Телефон" v-model="editDialogInputs.phone" clearable></el-input></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Отмена</el-button>
        <el-button type="primary" @click="handleSave(getScope.$index, getScope.row.name)">Сохранить</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions(['setModalSaveVisible']),
        ...mapMutations(['setSaveVisible', 'saveUserData']),
        handleClose() {
            this.setModalSaveVisible(false)
        },
        handleSave(index, name) {
            let userData = this.editDialogInputs
            userData.index = index
            this.saveUserData(userData)
            this.$message({
                message: `Данные пользователя ${name} успешно изменены`,
                type: 'success'
            })
            this.setModalSaveVisible(false)
        }
    },
    computed: {
        ...mapGetters(['getScope', 'isSaveModalVisible'])
    },
    watch: {
        getScope() {
            this.editDialogInputs.name = this.getScope.row.name
            this.editDialogInputs.username = this.getScope.row.username
            this.editDialogInputs.email = this.getScope.row.email
            this.editDialogInputs.phone = this.getScope.row.phone
        }
    },
    data() {
        return {
            editDialogInputs: {
                name: '',
                username: '',
                email: '',
                phone: ''
            }
        }
    }
}
</script>