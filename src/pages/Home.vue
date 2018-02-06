<template>
  <div class="home">

    <transition name="fade">
      <div class="cover-bg" v-if="background.visible">
        <img :src="background.cover" alt="">
      </div>
    </transition>

    <div class="container">
      <div class="title">
        列表🦉
      </div>

      <div class="list">
        <div
          class="item"
          v-for="(book, index) in list"
          :key="index"
          @mouseenter="mEnter(book)"
          @mouseout="mOut(book)"
          @click="$router.push({
            name: 'Read',
            params: {
              id: book.id
            }
          })"
        >
          <div class="cover">
            <img :src="book.cover" alt="">
          </div>
          <div class="name">
            {{ book.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      list: [],
      background: {
        cover: '',
        visible: false
      }
    }
  },
  created () {
    let query = new AV.Query('book')
    query.find().then((data) => {
      this.list = data.map((book) => {
        return {
          name: book.get('name'),
          cover: book.get('cover'),
          id: book.id
        }
      })
    })
  },
  methods: {
    mEnter (book) {
      this.background.visible = true
      this.background.cover = book.cover
    },
    mOut () {
      this.background.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%);
  display: flex;
  justify-content: center;

  .cover-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(40px);
    }
  }

  .container {
    width: 70%;
    position: relative;
    z-index: 2;
    margin-top: 50px;

    .title {
      font-size: 50px;
      color: #353535;
    }

    .list {
      margin-top: 40px;
      text-align: center;
      white-space: nowrap;
      width: 100%;
      overflow-x: scroll;
      padding: 50px 0;

      .item {
        width: 200px;
        display: inline-block;
        margin: 0 20px;
        &:hover {
          .cover {
            transform: translateY(-10px);
            box-shadow: 0 0 15px 0 #666666;
          }
        }

        .cover {
          width: 200px;
          height: 250px;
          background-color: #353535;
          border-radius: 15px;
          cursor: pointer;
          overflow: hidden;
          transition: all .3s ease;
          box-shadow: 0 0 5px 0 #8e8e8e;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .name {
          text-align: center;
          margin-top: 20px;
          color: #444;
          text-shadow: 0 0 1px #fff;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .home {
    .container {
      width: 100%;
      margin-top: 20px;

      .title {
        padding: 0 20px;
        font-size: 35px;
      }
    }
  }
}
</style>
