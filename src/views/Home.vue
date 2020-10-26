<template>
  <div class="home">
    <AddModal :lastPage="lastPage"/>
    <EditModal/>
    <DeleteModal/>
    <Table title="Пользователи" @lastPage="getLastPage"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AddModal from '@/components/controls/AddModal'
import EditModal from '@/components/controls/EditModal'
import DeleteModal from '@/components/controls/DeleteModal'
import Table from '@/components/Table'

export default {
  name: 'Home',
  components: {
    AddModal,
    EditModal,
    DeleteModal,
    Table
 },
 methods: {
   getLastPage(data) {
     this.lastPage = data
     console.log(this.lastPage)
   }
 },
 data() {
   return {
     lastPage: 0
   }
 }
}
</script>