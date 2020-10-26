<template>
  <div>
    <!--Table-->
    <div class="table">
      <h1>{{ title }}</h1>
      <div class="table-container">
            <div class="table-content" v-loading="getLoadingStatus" element-loading-background="#ffffff">
                  <el-row :gutter="20" class="form-row">
                    <div v-bind:class="{ hide: getLoadingStatus }">
                      <el-col :span="21"><el-input placeholder="Искать" v-model="search" class="hide" clearable></el-input></el-col>
                      <el-col :span="2"><el-button type="primary" @click="showModalAdd">Добавить</el-button></el-col>
                    </div>
                  </el-row>
                  <el-table :data="searchedData" v-bind:class="{ hide: getLoadingStatus }" 
                  @row-dblclick="viewUserProfile" v-bind:row-class-name="tableRowClassName">
                    <el-table-column prop="id" label="ID" width="180" sortable></el-table-column>
                    <el-table-column prop="name" label="Name" width="180" sortable></el-table-column>
                    <el-table-column prop="username" label="Username" sortable></el-table-column>
                    <el-table-column prop="email" label="E-mail" sortable></el-table-column>
                    <el-table-column prop="phone" label="Phone" sortable></el-table-column>
                    <el-table-column>
                      <template slot-scope="scope">
                        <el-button size="mini" @click="showModalSave(scope)">Изменить</el-button>
                        <el-button size="mini" type="danger" @click="showModalDelete(scope)">Удалить</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div v-if="searchedData.length === 0" class="not-found-notice" v-bind:class="{ hide: getLoadingStatus }">
                      <h3>По данному запросу ничего не найдено</h3>
                  </div>
                  <paginate v-model="currentPage" :page-count="setPageCount" :click-handler="setCurrentPage" :prev-text="'<'" :next-text="'>'" 
                    :container-class="'pagination'" :page-class="'page-item'" :active-class="'item-active'" />
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
    ...mapActions(['fetchUsers', 'setModalDeleteVisible', 'setModalSaveVisible', 'setCurrentScope', 'setModalAddVisible']),
    ...mapMutations(['saveUserData', 'setDeleteVisible', 'setSaveVisible', 'setScope', 'setAddVisible']),
    tableRowClassName() {
      if (this.searchedData.length === 1 && this.getUsers.length > 1 
          && this.currentPage !== this.setPageCount) {
        return 'success-row'
      }
    },
    showModalAdd() {
      this.setModalAddVisible(true)
      this.$emit('lastPage', this.setPageCount)
    },
    showModalDelete(scope) {
      this.setModalDeleteVisible(true)
      this.setCurrentScope(scope)
    },
    showModalSave(scope) {
      this.setModalSaveVisible(true)
      this.setCurrentScope(scope)
    },
    setCurrentPage(val) {
      this.$router.push(`${this.$route.path}?page=${val}`)
      this.currentPage = val
    },
    viewUserProfile(evt) {
      this.$router.push(`${this.$route.path}/user/${evt.id}`)
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'getLoadingStatus']),
    searchedData() {
      let searchedData = this.getUsers.filter(item => !this.search || 
                         item.name.toLowerCase().includes(this.search.toLowerCase()) || 
                         item.username.toLowerCase().includes(this.search.toLowerCase()) ||
                         item.email.toLowerCase().includes(this.search.toLowerCase()) ||
                         item.phone.toLowerCase().includes(this.search.toLowerCase()))

      if (this.search.length > 0) {
        return searchedData.splice(0, 3)
      } else {
        return searchedData.splice((this.currentPage - 1) * 3, 3)
      }
    },
    setPageCount() {
      return Math.ceil(this.getUsers.length / 3)
    }
  },
  data() {
    return {
      search: '',
      routePageQuery: parseInt(this.$route.query.page),
      currentPage: 0
    }
  },
  async mounted() {
    this.fetchUsers()
    this.currentPage = this.routePageQuery
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

.pagination {
  user-select: none;
  margin: 15px !important;
}

.page-item {
  padding: 5px;
  color: #42b983;
}

.page-item > a {
  padding: 5px;
}

.page-item > a:focus {
  background-color: #42b983;
}

.item-active {
  background-color: #42b983;
  color: white;
}

/* a {
  color: #42b983;
} */

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
