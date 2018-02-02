<template>
  <div class="home">
    <div class="container">
      <div class="title">
        列表🦉
      </div>

      <div class="list">
        <div class="item">
          <div class="cover"></div>
          <div class="name">七大罪</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
  align-items: center;

  .container {
    width: 70%;

    .title {
      font-size: 50px;
      color: #353535;
    }

    .list {
      margin-top: 40px;
      text-align: center;

      .item {
        width: 200px;
        display: inline-block;
        margin: 0 20px;
        .cover {
          width: 200px;
          height: 250px;
          background-color: #353535;
          border-radius: 15px;
          cursor: pointer;
        }
        .name {
          text-align: center;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
