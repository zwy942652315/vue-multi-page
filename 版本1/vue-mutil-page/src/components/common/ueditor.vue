<template>
    <div ref="editor"></div>
</template>
<script>
 /* eslint-disable */
import '../../../static/ueditor/ueditor.config'
import '../../../static/ueditor/ueditor.all.min'
import '../../../static/ueditor/lang/zh-cn/zh-cn'
 export default {
    data() {
        return {
            id: Math.random(10) + 'ueditorId',
        };
    },
    props: {
        value: {
            type: String,
            default: null,
        },
        config: {
            type: Object,
            default: {},
        }
    },
    watch: {
        value: function value(val, oldVal) {
            this.editor = UE.getEditor(this.id, this.config);
            if (val !== null) {
                this.editor.setContent(val);
            }
        },
    },
    mounted () {
        // 保证 this.$el 已经插入文档
        this.$refs.editor.id = this.id
        this.editor = UE.getEditor(this.id, this.config)
        this.editor.ready(() => {
            this.$nextTick(function () {
                // 保证 this.$el 已经插入文档
                this.$refs.editor.id = this.id;
                this.editor = UE.getEditor(this.id, this.config);
                this.editor.ready(function () {
                this.editor.setContent(this.value);
                this.editor.addListener("contentChange", function () {
                const wordCount = this.editor.getContentLength(true);
                const content = this.editor.getContent();
                const plainTxt = this.editor.getPlainTxt();
                this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt });
                }.bind(this));
                this.$emit('ready', this.editor);
                }.bind(this));
            });
        })
    }
 };
</script>
<style>

</style>