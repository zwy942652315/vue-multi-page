<template>
  <div class="header">
    <div class="all">全部分类</div>
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="[]" background-color="#2b2e36" text-color="#9097a8" active-text-color="#ff9a00">
            <template v-for="menuItem in menuListLevel">
                <el-menu-item v-if="menuItem.level == 1" :key="menuItem.menu_id" :index="menuItem.menu_id.toString()" @click="menuClick(menuItem)" :title="menuItem.isOver ? menuItem.name : ''">
                    <i class="el-icon-document"></i>
                    <span slot="title">{{menuItem.name}}</span>
                </el-menu-item>

                <el-submenu v-else :key="menuItem.menu_id" :index="menuItem.menu_id.toString()">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">{{menuItem.name}}</span>
                    </template>
                    <!-- 无副标题 -->
                    <el-menu-item v-if="menuItem.level == 2" v-for="submenu in menuItem.children" :index="submenu.menu_id.toString()" :key="submenu.menu_id" @click="menuClick(submenu)">{{submenu.name}}</el-menu-item>
                    <!-- 有副标题 -->
                    <el-menu-item-group v-if="menuItem.level == 3" v-for="submenu in menuItem.children" :key="submenu.menu_id">
                        <span slot="title">{{submenu.name}}</span >
                        <el-menu-item v-for="submenuItem in submenu.children" :index="submenuItem.menu_id.toString()" :key="submenuItem.menu_id" @click="menuClick(submenuItem)">{{submenuItem.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </template>
        </el-menu>
    </el-aside>
  </div>
</template>
<script>
  import _g from '@common/global';
  export default {
    data() {
        return {
            menuListLevel:[
                {
                    menu_id: '1_1',
                    name: '首页',
                    level: 1,
                    url: 'index'
                },
                {
                    menu_id: '1_1',
                    name: '我的',
                    level: 1,
                    url: 'my'
                },
            ]
        }
    },
    methods: {
        menuClick(menuObj){
            console.log(menuObj);
            let self = this;
            console.log(self.$route.meta)
            self.$router.push({path: menuObj.url})
            // self.$router.push({path: menuObj.url + '?order=' +  menuObj.order })
        },
        // 判断是否溢出，鼠标悬浮显示
        isOverflow () {
            let self = this;
            _g.$('.el-menu-item').each(function (i, v) {
                self.menuListLevel[i].isOver = _g.$(this).width() < _g.$(this).find('span').width();
            });
        }
    },
    mounted () {
        this.isOverflow();
    }
  }

</script>

<style lang="scss" scoped>
    .all{
        width: 100%;
        height: 70px;
        color: #fff;
        text-indent: 60px;
        line-height: 70px;
    }
    .el-menu-item{
        text-overflow: ellipsis;
        -o-text-overflow:ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .el-submenu {
        .el-menu-item:hover{
            color: #fff !important;
        }
        .el-menu-item.is-active{
            color: #ff9a00 !important;
        }
    }
</style>
