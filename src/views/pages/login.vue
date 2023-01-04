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
                Log in
            </a-button>
            </a-form-model-item>
        </a-form-model>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            formInline: {
                user: '',
                password: '',
            }
        }
    },
    methods: {
        handleSubmit() {
            console.log('登录')
        }
    }
}
</script>
<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
}
.box {
    width: 400px;
    height: 300px;
}
</style>