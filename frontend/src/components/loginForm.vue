<template>
    <form action="" @submit="login($event)">
        <div class="container">
            <div class="input-container">
                <label for="email">Email:</label>
                <input type="email" v-model="email" name="email" id="email" placeholder="Digite seu email...">
            </div>
            <div class="input-container">
                <label for="password">Password:</label>
                <input type="password" v-model="password" name="password" id="password" placeholder="Digite sua Senha...">
            </div>
            <input id="btn" type="submit" value="LOG-IN">
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null,

        }
    },

    methods: {
        async login(e) {
            e.preventDefault()

            const data = {
                email: this.email,
                password: this.password,

            }

            const dataJson = JSON.stringify(data)

            await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: dataJson
            }).then((resp) => resp.json())
                .then((data) => {
                    let auth = false

                    if (data.error) {
                        this.msg = data.error
                        this.msgClass = "error"
                        console.log("deu erro" + error)
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
                    }, 1000);
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