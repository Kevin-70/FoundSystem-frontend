
<template>
    <div class="echarts-box">
      <div id="myEcharts" :style="{ width: this.width, height: this.height }"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  import {onMounted, onUnmounted, defineComponent, watch, ref, defineProps} from "vue";
  
  export default {
    name: "PieGraph",
    props: {
      width: {
        type: String,
        default: "600px"
      },
      height: {
        type: String,
        default: "400px"
      },
      data: {
        type: Array,
        default: []
      },
      dataName: {
        type: Array,
        default: []
      },
      name: {
        type: String,
        default: "Pie Chart"
      }
    },
    
    setup(props) {
      let myEcharts = echarts;
      let pieData = []
        for (let i = 0; i < props.data.length; i++) {
          pieData.push  (
            {
              value: props.data[i],
              name: props.dataName[i]
            }
          )  
        }
        // console.log('pieData') 
        // console.log(pieData)    

  
      onMounted(() => {
        initChart();
      });
  
      onUnmounted(() => {
        myEcharts.dispose;
      });
  
      function initChart() {
        let chart = myEcharts.init(document.getElementById("myEcharts"), "purple-passion");
        
        chart.setOption({
          title: {
            text: props.name,
            left: "center",
          },
          tooltip: {
            trigger: 'item',
            formatter: '<br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },

          series: [
            {              
              type: "pie",
              data: pieData, 
            }
          ]
        });
        window.onresize = function () {
          chart.resize();
        };
      }
  
      return {
        initChart,
      };
    }
  };
  </script>
  
  