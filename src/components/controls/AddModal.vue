<template>
    <el-dialog title="Добавить нового пользователя" :visible.sync="isAddModalVisible" width="30%" :before-close="handleClose">
      <el-row :gutter="20" class="form-row">
        <el-col :span="4"><label>Имя</label></el-col>
        <el-col :span="19"><el-input placeholder="Имя" v-model="newUser.name" minlength="2" maxlength="30" show-word-limit clearable></el-input></el-col>
      </el-row>
      <el-row :gutter="20" class="form-row">
        <el-col :span="4"><label>Username</label></el-col>
        <el-col :span="19"><el-input placeholder="Username" v-model="newUser.username" minlength="2" maxlength="30" show-word-limit clearable></el-input></el-col>
      </el-row>
      <el-row :gutter="20" class="form-row">
        <el-col :span="4"><label>E-mail</label></el-col>
        <el-col :span="19"><el-input placeholder="E-mail" v-model="newUser.email" minlength="8" maxlength="30" show-word-limit clearable></el-input></el-col>
      </el-row>
      <el-row :gutter="20" class="form-row">
        <el-col :span="4"><label>Телефон</label></el-col>
        <el-col :span="19"><el-input placeholder="Телефон" v-model="newUser.phone" minlength="8" maxlength="30" show-word-limit clearable></el-input></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Отмена</el-button>
        <el-button type="primary" @click="handleAdd()">Добавить</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
    props: {
        lastPage: Number
    },
    methods: {
        ...mapActions(['setModalAddVisible', 'fetchUsers']),
        ...mapMutations(['setAddVisible', 'addUserData']),
        handleClose() {
            this.setModalAddVisible(false)
        },
        handleAdd() {
            let data = this.newUser
            data.id = this.getUsers.length + 1
            this.addUserData(data)
            this.fetchUsers()
            this.$notify({
                message: `Пользователь <b>${this.newUser.name}</b> успешно создан`,
                dangerouslyUseHTMLString: true,
                type: 'success'
            })
            this.resetFields()
            this.handleClose()
            this.$router.replace(`${this.$route.path}?page=${this.lastPage}`)
        },
        resetFields() {
            this.newUser.name = ''
            this.newUser.username = ''
            this.newUser.email = ''
            this.newUser.phone = ''
        }
    },
    computed: {
        ...mapGetters(['isAddModalVisible', 'getUsers'])
    },
    data() {
        return {
            newUser: {
                name: '',
                username: '',
                email: '',
                phone: '',
            }
        }
    }
}
</script>

<style>

</style>