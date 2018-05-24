<template>
    <!-- <inputC :prependLabel="'第'" :appendLable="'年'" :textAlign="'center'" :width="'100'"></inputC> -->
    <div class="ui-input__box">
      <span class="ui-input__prelabel" :style="'width:' + preWidth + 'px; text-align: ' + preTextAlign">{{prependLabel}}</span>
      <input type="text" class="ui-input__input" v-model="formValue" :style="'width:' + width + 'px; text-align: ' + textAlign + ';color: ' + color">
      <span class="ui-input__appendlabel" :style="'width:' + appendWidth + 'px'">{{appendLable}}</span>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          formValue: ''
      }
    },
    props: {
        preWidth: {
            type: String,
            default: null
        },
        width: {
            type: String,
            default: '180px'
        },
        appendWidth: {
            type: String,
            default: null
        },
        prependLabel: {
            type: String,
            default: null
        },
        appendLable: {
            type: String,
            default: null
        },
        preTextAlign: {
            type: String,
            default: 'left'
        },
        textAlign: {
            type: String,
            default: 'left'
        },
        color: {
            type: String,
            default: '#333'
        },
        inputValue: {
            type: String,
            default: ''
        },
    },
    components: {
    },
    methods: {

    },
    mounted () {
        this.formValue = this.inputValue;
    }
  }
</script>
<style lang="scss">
  .ui-input__box{
    width: auto;
    display: inline-block;
    .ui-input__prelabel{
      display: inline-block;
    }
    .ui-input__appendlabel{
      display: inline-block;
    }
    .ui-input__input{
      height: 40px;
      line-height: 40px;
      border: none;
      border-bottom: 1px solid #dddd;
      outline: none;
      padding: 0 15px;
      font-size: inherit;
    }
  }
</style>
