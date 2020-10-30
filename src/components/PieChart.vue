<template>
  <div class="pie-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { mapActions, mapGetters } from 'vuex'

export default {
  extends: Pie,
  methods: {
    ...mapActions(['fetchUsers'])
  },
  computed: {
    ...mapGetters(['getUsers']),
    // usersGeoMinusLat() {
    //   return this.chartData
    // },
    // usersGeoPlusLat() {
    //   return this.getUsers.filter(user => { user.geo.lat > 0 })
    // }
  },
  // data() {
  //   return {
  //     chartData: this.getUsers
  //   }
  // },
  mounted () {
    this.$store.dispatch('fetchUsers')
    console.log(this.getUsers)
    // console.log(this.usersGeoMinusLat)
    this.renderChart({
        labels: ['+lat', '-lat', '+lng', '-lng'],
        datasets: [{
            label: 'Статистика отрицательных и положительных значений широты/долготы местонахождений пользователей',
            data: [this.usersGeoPlusLat, this.usersGeoMinusLat],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    })
  }
}
</script>