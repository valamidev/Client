import React from "react";
import _ from "lodash";
import ReactApexChart from "react-apexcharts";

function Candlechart(props) {
  let points = [];
  let series = [];
  series[0] = { data: [] };

  if (props.loading === false) {
    if (typeof props.trade_data.actions != "undefined") {
      points = props.trade_data.actions[0].map(elem => {
        let color = "#c91717";
        if (elem.action === "BUY") {
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

            text: `${elem.action} - ${elem.price} - SUM: ${_.round(
              elem.quote_balance,
              2
            )}`
          }
        };
      });
    }

    series[0].data = props.series_data.map(elem => {
      return {
        x: new Date(elem.time),
        y: [elem.open, elem.high, elem.low, elem.close]
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
    },
    markers: { size: 0 }
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
