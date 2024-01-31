<template>
    <div class="container">
        <h1>Log-in</h1>
        <LoginForm />
    </div>

</template>

<script>
import LoginForm from '@/components/loginForm.vue';

export default {
    components: { LoginForm }
}

</script>

<style scoped>
.container  {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container h1 {
    text-decoration: underline;
    margin-top: 50px;
    margin-bottom: 90px;
}

</style>