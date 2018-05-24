
<template>
	<div class="form__itemWrap" :class="{'is-disabled':disabled}"  :style="{'width':width}">
		<div ref="formitem" class="form__item" :class="{'ifFocus':ifFocus,'alignR':align=='right','alignL':align=='left'}" >
			<slot name="prepend"></slot>
			<slot></slot>
			<slot name="append"></slot>
		</div>
		<slot name="tips"></slot>		
	</div>
</template>
<script>
	export default{
		props:{
			width:{
				type:String,
				default(){
					return null;
				}
			},
			align:{
				type:String,
				default(){
					return null;
				}
			},
			disabled:{
				type:Boolean,
				default(){
					return false;
				}
			}
		},
		data(){
			return{
				ifFocus:false
			}
		},
		methods:{

		},
		mounted(){
			let self =this;
			if(self.$refs.formitem.getElementsByTagName('input')){
				for(var input of self.$refs.formitem.getElementsByTagName('input')){
					input.addEventListener('focus',function(ev){
						self.ifFocus = true;
					});
					input.addEventListener('blur',function(ev){
						self.ifFocus = false;
					});
				}
			} 
			if(self.$refs.formitem.getElementsByTagName('textarea').length>0){

				self.$refs.formitem.getElementsByTagName('textarea')[0].addEventListener('focus',function(ev){
					self.ifFocus = true;
				});
				self.$refs.formitem.getElementsByTagName('textarea')[0].addEventListener('blur',function(ev){
					self.ifFocus = false;
				});
			}
			
		}
	}
</script>
<style lang="scss">
@import "@A/scss/base/color.scss";
.form__itemWrap{
	display:inline-block;
	width: 100%;
	vertical-align:top;
}
.form__item{
	font-size:0;
	width: 100%;
	// border:1px solid #d8dce5;
	height:max-content;
	// border-radius:3px;
	display: inline-table;
	box-sizing:border-box;
	overflow:hidden;
	& .el-input__inner{
		width: 100%;
		height:40px;
		border-radius:0;
	}
	.is-disabled{
		& .el-input-group__append, 
		  .el-input-group__prepend{
			background-color: #f5f7fa;
		    border-color: #dfe4ed;
		    color: #b4bccc;
		    cursor: not-allowed;
		}
	}
	&.ifFocus{
		border-color:$mainC;
	}
	&.alignL{
		& .el-input__inner{
			text-align: left;
		}
	}
	&.alignR{
		& .el-input__inner{
			text-align: right;
		}
	}
	& .el-input,
	  .el-input-group__append, 
	  .el-input-group__prepend,
	  .el-input__inner{
		border:none ;
	}
	& .el-input-group__append, 
	  .el-input-group__prepend{
		background:#fff;
		padding:0 12px;
	}
	
	& .formItem__prepend{
		color: #878d99;
	    vertical-align: middle;
	    display: table-cell;
	    position: relative;
	    border-right:1px solid #fff;
	    padding:0 10px;
	    width: 1px;
	    white-space: nowrap;
        text-align: right;
	}
	& .formItem__append{
		color: #878d99;
	    vertical-align: middle;
	    display: table-cell;
	    position: relative;
	    padding:0 10px;
	    width: 1px;
	    white-space: nowrap;
	}
	& .formItem-span{
		color: #878d99;
	    vertical-align: middle;
	    display: table-cell;
	    position: relative;
	    padding:0 5px;
	}
	& .el-select{
		display:table-cell;
		& .el-input{
			// border
		}
	}
	& .formItem__textarea{
		width: 100%;
		height:120px;
		box-sizing:border-box;
		resize:none;
		outline:none;
		border:none;
		padding:5px;
		border-radius:3px;
		font-size:12px;
		&::selection{
			background-color:$mainC;
			color:#fff;
		}
	}

    // 覆盖element-ui样式
    .input-box{
        display: inline-block;
        .input-label{
            display: inline-block;
        }
        .input{
            border: none;
            border-bottom: 1px solid #dcdfe6
        }
    }
    .el-input{
        width: auto;
    }
    .el-input__inner{
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #dcdfe6;
    }

}
</style>