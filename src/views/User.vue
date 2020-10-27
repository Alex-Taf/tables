<template>
    <div>
        <div class="user">
            <el-row :gutter="10" class="user-avatar">
                <el-col :span="24">
                    <el-image style="width: 250px; height: 250px" :src="avatarUrl"></el-image>
                </el-col>
                <el-col :span="24">
                    <span class="user-avatar-label">{{ user.name }}</span>
                </el-col>
            </el-row>
            <el-form :label-position="labelPosition" :model="formLabelAlign" class="user-form">
                <el-form-item label="Имя">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="Username">
                    <el-input v-model="formLabelAlign.username"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="formLabelAlign.email"></el-input>
                </el-form-item>
                <el-form-item label="Phone">
                    <el-input v-model="formLabelAlign.phone"></el-input>
                </el-form-item>
                <el-form-item label="City">
                    <el-input v-model="formLabelAlign.city"></el-input>
                </el-form-item>
                <el-form-item label="Website">
                    <el-input v-model="formLabelAlign.website"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <router-link to="/" class="back"><el-button>Назад</el-button></router-link>
    </div>
</template>

<script>
export default {
    computed:{
        user() {
            return this.$store.getters.getUserById(this.userId)
        }
    },
    data() {
        return {
            userId: +this.$route.params.id,
            labelPosition: 'right',
            formLabelAlign: {
                name: '',
                username: '',
                email: '',
                phone: '',
                city: '',
                website: ''
            },
            avatarUrl: 'https://via.placeholder.com/150'
        }
    },
    mounted() {
        console.log(this.userId)
        this.formLabelAlign.name = this.user.name
        this.formLabelAlign.username = this.user.username
        this.formLabelAlign.email = this.user.email
        this.formLabelAlign.phone = this.user.phone
        this.formLabelAlign.city = this.user.address.city
        this.formLabelAlign.website = this.user.website

        console.log(this.$route)
    }
}
</script>

<style>
.user {
    display: flex;  
    justify-content: center; 
}

.user-form {
    width: 30%;
}

.user-avatar-label {
    font-size: 30px;
    margin-top: 10px;
}

.back {
    margin-top: 30px !important;
}
</style>