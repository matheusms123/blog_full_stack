<template>
    <form action="" @submit="create($event)">
        <div class="container">
            <div class="input-container">
                <label for="title">title:</label>
                <input type="text" v-model="title" title="title" id="title" placeholder="Um titulo pra festa...">
            </div>
            <div class="input-container">
                <label for="description">description:</label>
                <input type="text" v-model="description" name="description" id="description"
                    placeholder="Digite o conteudo...">
            </div>
            <div class="input-container">
                <label for="photo">Foto:</label>
                <input type="file" name="photo">
            </div>

            <input id="btn" type="submit" value="cadastrar">
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            title: null,
            description: null
        }
    },
    methods: {
        async create(e) {
            e.preventDefault()

            const formData  = new FormData()

             formData.append('title', this.title)
             formData.append('description', this.description)
             formData.append('file', this.file)


             const token = this.$store.getters.token

                await fetch("http://localhost:5000/post/create", {
                    method: "POST",
                    headers:{
                        "auth-token": token
                    },
                    body: formData
                }).then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
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
    margin: 20px;
    font-size: 1.1em;
}

.input-container {
    display: flex;
    flex-direction: column;
    font-size: 1.1em;
    justify-content: center;
    align-items: start;
}

.input-container label {
    margin-top: 10px;
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
    color: #ffffff;
    border: none;
    margin-top: 30px;
    border-radius: 4px;
    cursor: pointer;
}

#btn:hover {
    background-color: rgb(0, 0, 177);
}

</style>