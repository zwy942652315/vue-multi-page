<template>
    <div>
      <a href="/views/my/my_detail.html">点击我的</a>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          
      }
    },
    components: {
    },
    methods: {
      
    },
    watch:{      //监听路由变化

        $route( to , from ){ 

                //  to , from 分别表示从哪跳转到哪，都是一个对象

                // to.path   ( 表示的是要跳转到的路由的地址 eg:  /home );

         }

}
  }
</script>
<style>

</style>
