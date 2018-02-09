<template>
  <div class="reader">
    <div
      :class="['container', {
        'scale': selectSection
      }]"
      @click="selectSection = false"
    >

      <transition name="fade">
        <div class="loading" v-if="state.fetch" key="loading">
          <div class="panel">加载中...</div>
        </div>
        <div class="imagesContainer" v-else @scroll="updateIndex" key="images">
          <div class="images" ref="pictureContainer">
            <div class="item" v-for="(image, index) in pictures.images" :key="index">
              <img :src="image" alt="">
            </div>
          </div>
        </div>
      </transition>

      <div class="pageInfo">
        <span class="section">{{ pictures.name }}</span>
        <span class="now">{{ pictures.index }}</span>
        /
        <span class="count">{{ pictures.images.length }}</span>
      </div>
      <div class="menus">
        <div class="item" @click.stop="selectSection = true">
          <i class="iconfont icon-liebiao"></i>
        </div>
        <div class="item" @click.stop="$router.push({
          name: 'Home'
        })">
          <i class="iconfont icon-home"></i>
        </div>
      </div>
    </div>

    <transition name="slideLeft">
      <div class="sectionsContainer" v-show="selectSection">
        <ul class="list">
          <li :class="['item', {
            active: currentSection === item.id
          }]" v-for="(item, index) in list" :key="index">
            <div class="content" @click="toReadSection(item.id)">
              {{item.name}}
            </div>
          </li>
          <infinite-loading @infinite="infiniteHandler" ref="loading">
            <img src="../assets/svg/loading.svg" class="loadingIcon" slot="spinner" alt="">
            <span slot="no-more" class="tips">
              没有更多章节了🐻
            </span>
          </infinite-loading>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import AsyncLoad from '@/lib/loadImage'

export default {
  data () {
    return {
      list: [],
      selectSection: false,
      currentSection: '',
      page: {
        current: 0,
        size: 100,
        total: 0
      },
      pictures: {
        images: [],
        name: '',
        index: 1
      },
      state: {
        fetch: true
      }
    }
  },
  mounted () {
    this.loadData()
  },
  components: {
    InfiniteLoading
  },
  methods: {
    loadData () {
      this.$refs['loading'].$emit('infinite')
    },
    infiniteHandler ($state) {
      let id = this.$route.params.id
      let sql = `select count(*),name from section where bookid = '${id}' limit ${this.page.current * this.page.size},${this.page.size} order by index`
      AV.Query.doCloudQuery(sql).then((data) => {
        this.list = this.list.concat(data.results.map((item) => {
          return {
            name: item.get('name'),
            id: item.id,
            index: item.get('id')
          }
        }))

        this.page.current++
        this.page.total = data.count

        // initialize data
        if (this.pictures.images.length === 0) {
          let section = localStorage.section
          if (!section) {
            section = data.results[0].id
          }
          this.loadPictures(section)
        }

        $state.loaded()

        if (data.results.length < this.page.size || data.results.length === 0) {
          $state.complete()
        }
      })
    },
    loadPictures (id) {
      this.currentSection = id

      localStorage.section = id

      this.state.fetch = true

      let sql = `select * from section where objectId = '${id}'`
      AV.Query.doCloudQuery(sql).then((data) => {
        AsyncLoad(data.results[0].get('images')[0])
          .then(() => {
            this.state.fetch = false
            this.pictures.images = data.results[0].get('images')
          })

        this.pictures.name = data.results[0].get('name')
      })
    },
    updateIndex ($event) {
      Array.from($event.target.children).forEach((item, index) => {
        if ($event.target.scrollTop + $event.target.clientHeight - 40 > item.offsetTop) {
          this.pictures.index = index + 1
        }
      })
    },
    toReadSection (id) {
      this.loadPictures(id)
      this.$refs['pictureContainer'].scrollTop = 0
      this.selectSection = false
    }
  }
}
</script>

<style lang="scss" scoped>
.reader {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;

  .container {
    background-color: #444444;
    transition: all .3s ease;
    height: 100%;
    height: 100%;

    .pageInfo {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background-color: #707070;
      border-radius: 10px;
      padding: 10px;
      opacity: 0.6;
      color: #fff;
      font-size: 12px;
    }

    .menus {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #707070;
      border-radius: 10px;
      padding: 10px;
      opacity: 0.6;
      cursor: pointer;

      .item {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        i {
          color: #fff;
          font-size: 18px;
        }
      }
    }

    .images {
      width: 70%;
      margin: auto;
      height: 100vh;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

      .item {
        width: 100%;
        height: auto;
        background-color: #fff;
        margin: 10px 0;

        img {
          width: 100%;
        }
      }
    }

    .loading {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;

      .panel {
        width: 200px;
        height: 150px;
        background: linear-gradient(to bottom, #fff, #ddd);
        border-radius: 4px;
        color: #555;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        box-shadow: 0 2px 10px 0 #1b1b1b;
      }
    }
    .imagesContainer {
      position: absolute;
      top: 0;
      width: 100%;
    }

    &.scale {
      transform: scale(0.8) translateX(200px);
    }
  }

  .sectionsContainer {
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      height: 50vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      li {
        margin-bottom: 20px;
        color: #ebebeb;
        cursor: pointer;

        &:hover {
          .content {
            transform: translateX(10px);
          }
        }

        .content {
          transition: all .3s ease;
        }

        &.active {
          .content {
            &:before {
              content: '🐾'
            }
          }
        }
      }

      .tips {
        color: #b1b1b1;
        font-size: 12px;
      }
    }
  }

}

@media screen and (max-width: 750px) {
  .reader {
    .container {
      .images {
        width: 100%;
        .item {
          margin: 0 0 10px 0;
        }
      }
    }
  }
}
</style>
