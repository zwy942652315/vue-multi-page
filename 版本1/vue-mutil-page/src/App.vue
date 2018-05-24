<template>
  <div id="app">
    <header class="app-header">
      <pageHeader></pageHeader>
    </header>
    <div class="app-body">
      <div class="app-left">
        <pageMenu></pageMenu>
      </div>
      <div class="app-right">
        <div class="app-right-content">
          <div class="app-right-view">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import pageHeader from '@C/pageHeader'
import pageMenu from '@C/pageMenu'
export default {
  name: 'App',
  components: {
    pageHeader,
    pageMenu
  }
}
</script>

<style>
  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    flex: 0 0 auto;
    height: 60px;
    width: 100%;
    min-width: 1200px;
    background: #333;
  }

  .app-body {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
    display: flex;
  }

  .app-left {
    height: 100%;
    flex: 0 0 auto;
    width: 200px;
  }

  .app-right {
    height: 100%;
    flex: 1 1 auto;
    width: 100%;
    min-width: 1000px;
    display: flex;
    flex-direction: column;
    background-color: #e4e7ed;
  }

  .app-right-tabs {
    height: 50px;
    flex: 0 0 auto;
    width: 100%;
    background-color: #FFF;
    display: flex;
    & .app-right-tabs-operator {
      background-color: #FFF;
      height: 50px;
      font-size: 0;
      flex: 0 0 auto;
      width: 150px;
      & i {
        box-shadow: none !important;
      }
      & .el-dropdown-link {
        box-shadow: none !important;
      }
      & .operator-btn {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-left: 1px solid #DCDFE6;
        color: #C0C4CC;
        font-size: 20px;
        vertical-align: top;
        cursor: pointer;
      }
    }
    & .app-right-tabs-container {
      height: 50px;
      flex: 1 1 auto;
      width: 1%;
    }
  }

  .app-right-content {
    height: 100%;
    flex: 1 1 auto;
    width: 100%;
    padding: 20px;
    display: flex;
    box-sizing: border-box;
  }

  .app-right-view {
    width: 100%;
    overflow: auto;
    flex: 1 1 auto;
    background-color: #fff;
    padding:20px;
    position: relative;
  }
</style>
