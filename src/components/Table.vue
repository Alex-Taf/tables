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
            <div class="table-content" v-loading="isLoading" element-loading-background="#ffffff">
                  <div v-bind:class="{ hide: isLoading }"><el-input placeholder="Искать" v-model="search" class="hide" clearable></el-input></div>
                  <el-table :data="searchedData" v-bind:class="{ hide: isLoading }" v-bind:row-class-name="tableRowClassName">
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
                  <div v-if="searchedData.length === 0" class="not-found-notice" v-bind:class="{ hide: isLoading }">
                      <h3>По данному запросу ничего не найдено</h3>
                  </div>
                  <el-pagination background layout="prev, pager, next" class="pagination" v-bind:class="{ hide: isLoading }" 
                  :current-page.sync="pagination.currentPage" @current-change="changeCurrentPage" 
                  :page-count="pagination.pageCount">
                  </el-pagination>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    title: String
  },
  methods: {
    async fetchData() {
      await fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => { 
          this.tableData = json
          this.setPageCount()
          this.isLoading = false
      })
    },
    tableRowClassName() {
      if (this.searchedData.length === 1 && this.tableData.length > 1 
          && this.pagination.currentPage !== this.pagination.pageCount) {
        return 'success-row'
      }
    },
    handleSave(index, name) {
      this.tableData[index].name = this.editDialogInputs.name
      this.tableData[index].username = this.editDialogInputs.username
      this.tableData[index].email = this.editDialogInputs.email
      this.tableData[index].phone = this.editDialogInputs.phone
      this.$message({
        message: `Данные пользователя ${name} успешно изменены`,
        type: 'success'
      })
      this.editDialogVisible = false
    },
    handleDelete(index, name) {
      this.tableData.splice(index, 1)
      this.setPageCount()
      this.deleteDialogVisible = false
      this.$message({
        message: `Пользователь ${name} успешно удалён`,
        type: 'success'
      })
    },
    handleClose() {
      this.editDialogVisible = false
      this.deleteDialogVisible = false
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
    },
    changeCurrentPage(val) {
      this.pagination.currentPage = val
    },
    setPageCount() {
      this.pagination.pageCount = Math.ceil(this.tableData.length / 3)
    }
  },
  computed: {
    searchedData() {
      let filteredData = this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
      if (this.search.length > 0) {
        return filteredData.splice(0, 3)
      } else {
        return filteredData.splice((this.pagination.currentPage - 1) * 3, 3)
      }
    }
  },
  data() {
    return {
      isLoading: true,
      tableData: [],
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
      pagination: {
        currentPage: 1,
        pageCount: 0
      } 
    }
  },
  mounted() {
    this.fetchData()
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
