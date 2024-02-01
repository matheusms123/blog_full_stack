
<template>
 <h1>home</h1>
 <router-link to="/post">Adicionar blog</router-link>
 <div class="container" v-for="post in posts" :key="post.id">
  <!-- <div class="mini-image" :style="{'background-image': 'url(' + image +')'}">  </div> -->
  <div v-if="post.image">

    <img :src="image" alt="">
  </div>
  <div v-else>
    <img src="https://th.bing.com/th/id/OIP.uqo29BmmVdhmpl0zYgRAhQHaHa?rs=1&pid=ImgDetMain" alt="">
  </div>

  <h1>{{ post.title }}:</h1>
  <div>{{ post.description }}</div>
 </div>
</template>


<script>
export default {
  data(){
    return {
      posts: [],
      image: ''
    }
  },
  created() {
    this.allPost()
  },  

  methods: {

    async allPost() {
      await fetch("http://localhost:5000/post/all", {
        method: "GET",
        headers: {"Content-type": "application/json"}
      })
      .then((resp) => resp.json())
      .then((data) => {
        this.posts = data.posts
        
        this.posts.forEach((post, i) => {
          if(post.image) {
            console.log(post.image)
            this.image = post.image.replace("uploads", "http://localhost:5000/file").replaceAll("\\", "/")
            console.log(post.image)
          }
        });

      })
      .catch((err) => {
        console.log(err)
      })
    }
   
  }
}
  
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid black;
  justify-content: start;
  align-items: center;

}

.container h1 {
  margin-right: 70px;
  text-transform: uppercase;
}
.container img {
  margin-right: 50px;
  border: 2px solid black;
  height: 60px;
  width: 60px;
}
.mini-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  margin-bottom: 15px;
  background-color: #CCC;
  background-position: center;
  background-size: cover;
}

</style>