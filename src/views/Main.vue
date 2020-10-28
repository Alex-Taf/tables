<template>
    <div class="main">
        <router-link to="/home"><el-button type="success" class="getstarted">Приступить к работе</el-button></router-link>
    </div> 
</template>

<script>
export default {
    
}
</script>

<style>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.getstarted {
    padding: 30px 50px !important;
    font-size: 30px !important;
}
</style>