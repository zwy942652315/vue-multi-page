import Vue from 'vue'
import html2canvas from 'html2canvas'	
import jsPDF from 'jspdf'	
import C from './common'
import inputC from '@C/common/inputC'
import $ from 'webpack-zepto'


Vue.component('inputC', inputC)

export default{
    html2canvas,
    jsPDF,
    C,
    $
}