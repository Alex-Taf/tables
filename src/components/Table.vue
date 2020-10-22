<template>
  <div>
    <!--Dialogs-->
    <!--Edit-->
    <el-dialog v-if="onEditScope" title="Изменить пользователя" :visible.sync="editDialogVisible" width="30%" :before-close="handleClose">
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
        <el-button @click="editDialogVisible = false">Отмена</el-button>
        <el-button type="primary" @click="handleSave(onEditScope.$index, onEditScope.row.name)">Сохранить</el-button>
      </span>
    </el-dialog>
    <!--Delete-->
    <el-dialog v-if="onDeleteScope" title="Удалить пользователя" :visible.sync="deleteDialogVisible" width="30%" :before-close="handleClose">
      <span>Вы собираетесь удалить пользователя <b>{{ onDeleteScope.row.name }}</b>, подтвердите действие:</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">Отмена</el-button>
        <el-button type="danger" @click="handleDelete(onDeleteScope.$index, onDeleteScope.row.name)">Удалить</el-button>
      </span>
    </el-dialog>
    <!--Table-->
    <div class="table">
      <h1>{{ title }}</h1>
      <div class="table-container">
            <div class="table-content" v-loading="getLoadingStatus" element-loading-background="#ffffff">
                  <div v-bind:class="{ hide: getLoadingStatus }"><el-input placeholder="Искать" v-model="search" class="hide" clearable></el-input></div>
                  <el-table :data="searchedData" v-bind:class="{ hide: getLoadingStatus }" v-bind:row-class-name="tableRowClassName">
                    <el-table-column prop="id" label="ID" width="180" sortable></el-table-column>
                    <el-table-column prop="name" label="Name" width="180" sortable></el-table-column>
                    <el-table-column prop="username" label="Username" sortable></el-table-column>
                    <el-table-column prop="email" label="E-mail" sortable></el-table-column>
                    <el-table-column prop="phone" label="Phone" sortable></el-table-column>
                    <el-table-column>
                      <template slot-scope="scope">
                        <el-button size="mini" @click="showHandleEdit(scope)">Изменить</el-button>
                        <el-button size="mini" type="danger" @click="showHandleDelete(scope)">Удалить</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div v-if="searchedData.length === 0" class="not-found-notice" v-bind:class="{ hide: getLoadingStatus }">
                      <h3>По данному запросу ничего не найдено</h3>
                  </div>
                  <el-pagination background layout="prev, pager, next" class="pagination" v-bind:class="{ hide: getLoadingStatus }" 
                  :current-page.sync="getCurrentPage" @current-change="setCurrentPage" :page-count="getPageCount">
                  </el-pagination>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Table',
  props: {
    title: String
  },
  methods: {
    ...mapActions(['fetchUsers']),
    ...mapMutations(['saveUserData', 'deleteUser', 'setCurrentPage']),
    tableRowClassName() {
      if (this.searchedData.length === 1 && this.getUsers.length > 1 
          && this.getCurrentPage !== this.getPageCount) {
        return 'success-row'
      }
    },
    handleSave(index, name) {
      let userData = this.editDialogInputs
      userData.index = index
      this.saveUserData(userData)
      this.$message({
        message: `Данные пользователя ${name} успешно изменены`,
        type: 'success'
      })
      this.editDialogVisible = false
    },
    handleDelete(index, name) {
      this.deleteUser(index)
      this.deleteDialogVisible = false
      this.$message({
        message: `Пользователь ${name} успешно удалён`,
        type: 'success'
      })
    },
    handleClose() {
      this.editDialogVisible = this.deleteDialogVisible = false
    },
    showHandleDelete(scope) {
      this.onDeleteScope = scope
      this.deleteDialogVisible = true
    },
    showHandleEdit(scope) {
      this.onEditScope = scope
      this.editDialogInputs.name = scope.row.name
      this.editDialogInputs.username = scope.row.username
      this.editDialogInputs.email = scope.row.email
      this.editDialogInputs.phone = scope.row.phone
      this.editDialogVisible = true
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'getLoadingStatus', 'getPageCount', 'getCurrentPage']),
    searchedData() {
      let searchedData = this.getUsers.filter(item => !this.search || 
      item.name.toLowerCase().includes(this.search.toLowerCase()) || 
      item.username.toLowerCase().includes(this.search.toLowerCase()) ||
      item.email.toLowerCase().includes(this.search.toLowerCase()) ||
      item.phone.toLowerCase().includes(this.search.toLowerCase()))

      if (this.search.length > 0) {
        return searchedData.splice(0, 3)
      } else {
        return searchedData.splice((this.getCurrentPage - 1) * 3, 3)
      }
    }
  },
  data() {
    return {
      search: '',
      onDeleteScope: null,  
      deleteDialogVisible: false,
      onEditScope: null,
      editDialogVisible: false,
      editDialogInputs: {
        name: '',
        username: '',
        email: '',
        phone: ''
      },
    }
  },
  async mounted() {
    this.fetchUsers()
  }
}
</script>

<style>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.table-container {
  display: flex;
  justify-content: center;
}

.table-content {
  padding: 10px;
  width: 70%;
}

.table-select {
  display: block;
}

.el-table .success-row {
  background: #f0f9eb;
  font-weight: bold;
  color: green;
}

.form-row {
  margin-bottom: 10px;
}

.pagination {
  margin: 10px
}

.not-found-notice {
  color: #e87979;
}

.el-loading-mask {
  min-height: 700px;
}

.hide {
  display: none;
}
</style>
