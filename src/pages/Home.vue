<template>
  <div class="home">

    <transition name="fade">
      <div class="cover-bg" v-if="background.visible">
        <img :src="background.cover" alt="">
      </div>
    </transition>

    <div class="container">
      <div class="title">
        <span>
          Burmilla
        </span>
      </div>

      <div class="list">
        <div
          class="item"
          v-for="(book, index) in list"
          :key="index"
          @mouseenter="mEnter(book)"
          @mouseleave="mOut(book)"
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
  background: #444;
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
      font-size: 40px;
      color: #353535;
      text-align: center;
      span {
        background: linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .list {
      margin-top: 40px;
      text-align: center;
      white-space: nowrap;
      width: 100%;
      padding: 50px 0;

      .item {
        width: 50%;
        margin: 0 20px;
        background: #fff;
        margin: auto;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all .3s ease;
        border-radius: 4px;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: 0 2px 10px 0 #292929;

        &:hover {
          transform: translateY(-10px);
          // box-shadow: 0 12px 15px 0 #919191;
        }

        .cover {
          width: 120px;
          height: 120px;
          background-color: #353535;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .name {
          padding-left: 20px;
          text-align: left;
          color: #444;
          text-shadow: 0 0 1px #fff;
          flex: 1 1 auto;
          font-size: 14px;
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
