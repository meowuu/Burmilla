<template>
  <div class="home">
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
          @click="$router.push({
            name: 'Read',
            params: {
              id: book.id
            }
          })"
        >
          <div class="background">
            <img :src="book.cover"  alt="cover back">
          </div>
          <div class="content">
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

    <div class="author">
      Made With ❤️ By <a href="https://github.com/moonou">moonou</a>
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
  flex-direction: column;
  align-items: center;

  .container {
    width: 70%;
    position: relative;
    z-index: 2;
    margin-top: 50px;
    flex: 1 1 auto;
    overflow: auto;

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
        cursor: pointer;
        transition: all .3s ease;
        border-radius: 4px;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: 0 2px 10px 0 #292929;
        position: relative;

        &:hover {
          transform: translateY(-10px);
          // box-shadow: 0 12px 15px 0 #919191;
        }

        .background {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: blur(10px);
            opacity: 0.2;
          }
        }
        .content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
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

  .author {
    height: 30px;
    font-size: 14px;
    color: #999999;
    a {
      color: #05ac74;
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
