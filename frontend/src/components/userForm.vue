<template>
    <form action="" @submit="register($event)">
        <div class="container">
            <div class="input-container">
                <label for="name">Name:</label>
                <input type="text" v-model="name" name="name" id="name" placeholder="Digite seu Nome...">
            </div>
            <div class="input-container">
                <label for="email">Email:</label>
                <input type="email" v-model="email" name="email" id="email" placeholder="Digite seu email...">
            </div>
            <div class="input-container">
                <label for="password">Password:</label>
                <input type="password" v-model="password" name="password" id="password" placeholder="Digite sua Senha...">
            </div>
            <div class="input-container">
                <label for="confirmpassword">Confirme sua senha:</label>
                <input type="password" v-model="confirmpassword" name="confirmpassword" id="confirmpassword"
                    placeholder="Digite sua Senha...">
            </div>
            <input id="btn" type="submit" value="cadastrar">
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: null,
            email: null,
            password: null,
            confirmpassword: null
        }
    },
    methods: {
        async register(e) {
            e.preventDefault()

            const data = {
                name: this.name,
                email: this.email,
                password: this.password,
                confirmpassword: this.confirmpassword
            }

            const dataJson = JSON.stringify(data)

            await fetch("http://localhost:5000/user/register", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: dataJson
            }).then((resp) => resp.json())
                .then((data) => {
                    let auth = false

                    if (data.error) {
                        this.msg = data.error
                        this.msgClass = "error"
                    } else {
                        auth = true

                        this.msg = data.msg
                        this.msgClass = 'sucess'

                        this.$store.commit("authenticate", { token: data.token, userId: data.UserId })
                    }


                    setTimeout(() => {
                        if (!auth) {
                            this.msg = null
                        } else {
                            this.$router.push("/home")
                        }
                    }, 2000);
                })
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 1.2em;
}

.input-container input {
    height: 25px;
    width: 300px;
    margin-top: 10px;
}

#btn {
    font-size: 1.1em;
    padding: 15px 25px;
    background-color: blue;
    color: white;
    border: none;
}
</style>