<template>
    <div v-loading="getLoadingStatus" element-loading-background="#ffffff">
        <div class="user" :class="{ hide: getLoadingStatus }">
            <el-row :gutter="10" class="user-avatar">
                <el-col :span="24">
                    <el-avatar :size="200" class="user-avatar-image" :src="`http://lorempixel.com/640/360`"></el-avatar>
                </el-col>
                <el-col :span="24" class="user-avatar-label">
                    <span class="user-avatar-label-name">{{ getUserById.name || 'template-text' }}</span>
                    <span class="user-avatar-label-email">{{ getUserById.email || 'template-text' }}</span>
                </el-col>
            </el-row>
            <el-row :gutter="10" class="user-info">
                <el-row :gutter="10" class="user-info-company">
                    <el-col :span="24" class="user-info-company-name user-info-company-item">
                        <span class="user-info-company-item-title">COMPANY</span>
                        <span class="user-info-company-name-label user-info-company-item-label">{{ getUserById.company.name || 'template-text' }}</span>
                    </el-col>
                    <el-col :span="24" class="user-info-company-catchphrase user-info-company-item">
                        <span class="user-info-company-item-title">CATCHPHRASE</span>
                        <span class="user-info-company-catchphrase-label user-info-company-item-label">{{ getUserById.company.catchPhrase || 'template-text' }}</span>
                    </el-col>
                    <el-col :span="24" class="user-info-company-bs user-info-company-item">
                        <span class="user-info-company-item-title">BS</span>
                        <span class="user-info-company-bs-label user-info-company-item-label">{{ getUserById.company.bs || 'template-text' }}</span>
                    </el-col>
                </el-row>
            </el-row>
        </div>
        <router-link to="/home" class="back"><el-button>Назад</el-button></router-link>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    methods: {
        ...mapActions(['fetchUserById'])
    },
    computed:{
        ...mapGetters(['getUserById', 'getLoadingStatus'])
    },
    data() {
        return {
            userId: +this.$route.params.id
        }
    },
    mounted() {
        this.fetchUserById(this.userId)
    }
}
</script>

<style>
.user {
    display: flex;
    flex-direction: column;  
    justify-content: center; 
    width: 100%;
    height: 100%;
    margin-top: 100px;
}

.user-avatar-image {
    border: 5px solid #42b983;
    -webkit-box-shadow: -1px -1px 31px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px -1px 31px -6px rgba(0,0,0,0.75);
    box-shadow: -1px -1px 31px -6px rgba(0,0,0,0.75);
}

.user-avatar-label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
}

.user-avatar-label-name {
    font-size: 30px;
}

.user-avatar-lavel-email {
    font-style: italic;
    font-size: 18px;
    color: gray;
}

.user-info {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 30px 10px;
}

.user-info-company {
    display: flex;
    justify-content: center;
    width: 50%;
}

.user-info-company-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.user-info-company-item-title {
    font-weight: bold;
    color: #42b983;
    margin: 5px;
}

.user-info-company-item-label {
    color: gray;
}

.back {
    margin: 50px;
}

.hide {
    display: none;
}
</style>