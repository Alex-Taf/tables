<template>
  <div class="table">
    <h1>{{ title }}</h1>
    <div class="table-container">
        <div class="table-content">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-input placeholder="Please input to Search" v-model="search" clearable></el-input>
              </el-col>
              <el-col :span="4">
                <el-select v-model="selectValue" placeholder="Select by">
                  <el-option v-for="item in selectOptions" :key="item.selectValue" :label="item.label" :value="item.value" class="table-select"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-table :data="searchedData" v-bind:row-class-name="tableRowClassName">
              <el-table-column prop="id" label="ID" width="180"></el-table-column>
              <el-table-column prop="name" label="Name" width="180"></el-table-column>
              <el-table-column prop="username" label="Username"></el-table-column>
              <el-table-column prop="email" label="E-mail"></el-table-column>
              <el-table-column prop="phone" label="Phone"></el-table-column>
            </el-table>
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
    fetchData() {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => { this.tableData = json })
    },
    tableRowClassName() {
      if (this.searchedData.length === 1) {
        return 'success-row'
      }
    }
  },
  computed: {
    searchedData() {
      return this.tableData.filter(elem => {
        return elem.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  data() {
    return {
      tableData: [],
      search: '',
      selectOptions: [{
          value: 'id',
          label: 'ID'
        }, {
          value: 'name',
          label: 'Name'
        }, {
          value: 'username',
          label: 'Username'
        }, {
          value: 'email',
          label: 'Email'
        }, {
          value: 'phone',
          label: 'Phone'
        }],
        selectValue: ''
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
}
</style>
