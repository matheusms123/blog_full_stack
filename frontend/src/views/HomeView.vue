
<template>
 <h1>home</h1>
 <div class="container" v-for="post in posts" :key="post.id">
  <div class="mini-image" :style="{'background-image': 'url(' + image +')'}">  </div>
  <img :src="image" alt="foto">
  <h1>{{ post.title }}:</h1>
  <p>{{ post.description }}</p>
 </div>
</template>


<script>
export default {
  data(){
    return {
      posts: [],
      image: null
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

        this.posts.forEach(post => {
          this.image = post.image.replace("uploads", "http://localhost:5173").replaceAll("\\", "/")
        });
        console.log(this.image)

        //console.log(this.posts[0].image)
        
        //console.log(data.posts[0].image)
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