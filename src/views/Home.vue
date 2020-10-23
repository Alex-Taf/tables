<template>
  <div class="home">
    <SaveModal/>
    <DeleteModal/>
    <Table title="Пользователи"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SaveModal from '@/components/controls/SaveModal'
import DeleteModal from '@/components/controls/DeleteModal'
import Table from '@/components/Table'

export default {
  name: 'Home',
  components: {
    SaveModal,
    DeleteModal,
    Table
  }
}
</script>