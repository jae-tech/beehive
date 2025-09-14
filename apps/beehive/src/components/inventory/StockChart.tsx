import React, { useEffect } from "react";
import * as echarts from "echarts";

export const StockChart: React.FC = () => {
  useEffect(() => {
    const chartDom = document.getElementById("stockChart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["9/8", "9/9", "9/10", "9/11", "9/12", "9/13"],
          axisLine: {
            lineStyle: {
              color: "#999",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#999",
            },
          },
        },
        series: [
          {
            name: "입고",
            type: "bar",
            stack: "total",
            data: [8, 5, 10, 6, 8, 12],
            itemStyle: {
              color: "#4CAF50",
            },
          },
          {
            name: "출고",
            type: "bar",
            stack: "total",
            data: [-5, -3, -7, -4, -6, -8],
            itemStyle: {
              color: "#E57373",
            },
          },
        ],
      };
      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return <div id="stockChart" style={{ width: "100%", height: "300px" }}></div>;
};
