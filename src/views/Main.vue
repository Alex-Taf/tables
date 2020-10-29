<template>
    <div class="main">
        <span class="main-title" data-aos="fade-down" data-aos-duration="2000">Таблица пользователей</span>
        <router-link to="/home">
                <el-button type="success" class="getstarted" data-aos="fade-up" data-aos-duration="2000">Приступить к работе</el-button>
        </router-link>
    </div> 
</template>

<script>
export default {
    
}
</script>

<style>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.main-title {
    font-size: 48px;
    margin: 70px;
}

.getstarted {
    padding: 30px 50px !important;
    font-size: 30px !important;
}
</style>