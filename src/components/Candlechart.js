import React from "react";
import _ from "lodash";
import ReactApexChart from "react-apexcharts";

function Candlechart(props) {
  let points = [];
  let series = [];
  series[0] = { data: [] };

  if (props.loading === false) {
    if (typeof props.trade_data.historyOrders != "undefined") {
      points = props.trade_data.historyOrders.map((elem, index) => {
        let color = "#c91717";
        if (elem.price < elem.sold) {
          color = "#0b9f00";
        }

        return {
          x: elem.time,
          y: elem.price,
          marker: {
            size: 3,
            fillColor: "#2698FF",
            strokeColor: "#2698FF",
            radius: 2
          },
          label: {
            borderColor: color,
            offsetY: 0,
            style: {
              color: "#fff",
              background: color
            },

            text: `Buy(${index}): ${elem.price}`
          }
        };
      });

      props.trade_data.historyOrders.forEach((elem, index) => {
        let color = "#c91717";
        if (elem.price < elem.sold) {
          color = "#0b9f00";
        }

        if (elem.closed === 0) {
          return;
        }

        points.push({
          x: elem.closed,
          y: elem.sold,
          marker: {
            size: 3,
            fillColor: "#2698FF",
            strokeColor: "#2698FF",
            radius: 2
          },
          label: {
            borderColor: color,
            offsetY: 0,
            style: {
              color: "#fff",
              background: color
            },

            text: `(${index}): ${elem.sold} Balance: ${_.round(
              elem.balance,
              2
            )}`
          }
        });
      });
    }

    series[0].data = props.series_data.map(elem => {
      return {
        x: new Date(Number(elem.time)),
        y: [
          Number(elem.open),
          Number(elem.high),
          Number(elem.low),
          Number(elem.close)
        ]
      };
    });
  }

  let options = {
    title: {
      text: "",
      align: "left"
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      tooltip: {
        enabled: false
      }
    },
    annotations: {
      points
    },
    chart: {
      animations: {
        enabled: false,
        animateGradually: {
          enabled: false
        },
        dynamicAnimation: {
          enabled: false
        }
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart
        series={series}
        options={options}
        type="candlestick"
        height="750"
      />
    </div>
  );
}

export default Candlechart;
