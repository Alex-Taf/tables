<template>
  <div id="app">
    <div id="nav">
      <el-menu class="el-menu-vertical-demo" :collapse="isMenuCollapse">
        <Burger class="burger" @checked="isChecked"/>
        <router-link to="/home" @click="collapse">
          <el-menu-item index="1" class="menu-item">
            <i class="el-icon-menu"></i>
            <span slot="title">Таблица</span>
          </el-menu-item>
        </router-link>
        <router-link to="/about">
          <el-menu-item index="2" class="menu-item">
            <i class="el-icon-document"></i>
            <span slot="title">О таблицах</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Burger from '@/components/controls/Burger'

export default {
  components: {
    Burger
  },
  methods: {
    isChecked() {
      this.isMenuCollapse = !this.isMenuCollapse
    },
    collapse() {
      return !this.isMenuCollapse ? this.isMenuCollapse = !this.isMenuCollapse : null
    }
  },
  data() {
    return {
      isMenuCollapse: true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 90vh;
}

#nav {
  position: fixed;
  top: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


.menu-item {
  padding: 0px 30px !important;
}

.el-menu {
  transition: .4s !important;
}

.el-menu-vertical-demo {
  width: 80px !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px !important;
  min-height: 400px;
}

.burger {
  padding: 30px !important;
}
</style>
