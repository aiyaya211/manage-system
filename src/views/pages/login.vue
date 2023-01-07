<template>
    <div class="container">
        <div class="box">
            <a-form-model layout="vertical" :model="formInline" @submit="handleSubmit" @submit.native.prevent :label-col="{span: 3, offset: 12}" >
                <a-form-model-item>
                    <a-input v-model="formInline.user" placeholder="Username">
                        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-model-item>
                <a-form-model-item>
                    <a-input v-model="formInline.password" type="password" placeholder="Password">
                        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-model-item>
                <a-form-model-item>
                    <a-button
                        type="primary"
                        html-type="submit"
                        :disabled="formInline.user === '' || formInline.password === ''"
                    >
                        登录
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'login',
    computed: {
        ...mapState(['rightList'])
    },
    data() {
        return {
            formInline: {
                user: '',
                password: '',
            }
        }
    },
    methods: {
        async handleSubmit() {
            console.log('登录');
            await this.$axios.post('/login', {
                name: this.formInline.user,
                password: this.formInline.password,
            }).then((res) => {
                console.log(res);
                this.$message.success('登录成功');
                this.router.push({ path: 'home' });
                this.$store.commit('setRightList', res.data.rights);
                this.$store.commit('setUserName', res.data.username );
                console.log(this.$store)
            }).catch((err) => {
                console.log(err)
                this.$message.error('账号名或者密码错误');
            });
        }
    }
}
</script>
<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-image: url(https://aiyaya122.oss-cn-hangzhou.aliyuncs.com/background.png);
}
.box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 300px;
    background: #fff;
}
</style>