<template>
  <div class="echarts-box">
    <div
      id="myEcharts2"
      :style="{ width: this.width, height: this.height }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {
  onMounted,
  onUnmounted,
  defineComponent,
  watch,
  ref,
  defineProps,
} from 'vue'

export default {
  name: 'BarGraph',
  // props: ["width", "height"],
  props: {
    width: {
      type: String,
      default: '600px',
    },
    height: {
      type: String,
      default: '400px',
    },
    x_data: {
      type: Array,
      default: [],
    },
    y_data: {
      type: Array,
      default: [],
    },
  },

  setup(props) {
    let myEcharts = echarts

    onMounted(() => {
      initChart()
    })

    onUnmounted(() => {
      myEcharts.dispose
    })

    function initChart() {
      let chart = myEcharts.init(
        document.getElementById('myEcharts2'),
        'purple-passion'
      )
      chart.setOption({
        title: {
          text: 'Expenditure Usage',
          left: 'center',
        },
        xAxis: {
          type: 'category',
          data: props.x_data,
        },
        tooltip: {
          trigger: 'axis',
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: props.y_data,
            // data: this.y_data,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}',
                },
              },
            },
          },
        ],
      })
      window.onresize = function () {
        chart.resize()
      }
    }

    return {
      initChart,
      //  x_data, y_data
    }
  },
}
</script>
