import React, { useContext, useEffect } from "react";
import _ from "lodash";
import DropdownWrap from "./Dropdown";
import ButtonWrap from "./Button";
import { Form, TextArea } from "semantic-ui-react";
import Candlechart from "./Candlechart";
import Tradelog from "./Tradelog";

import StockAPI from "../stockml_api";

import { SimulatorContext } from "../contexts";

//   <Dropdown field_name="tradepairs" options />

function DefaultPage() {
  const simulatorContext = useContext(SimulatorContext);

  useEffect(() => {
    async function update_data() {
      let tradepairs_result = await StockAPI.get_all_tradepairs();
      let strategies_result = await StockAPI.get_all_strategies();

      simulatorContext.setTradepairs(tradepairs_result);
      simulatorContext.setStrategies(strategies_result);
    }

    update_data();
  }, []);

  async function runBacktest() {
    try {
      simulatorContext.setInloading(true);

      let res = await StockAPI.run_massbacktest(
        simulatorContext.simulator_options
      );

      console.log(simulatorContext.simulator_options);

      simulatorContext.setBacktest({
        candlechart: res.candledata,
        test_result: res.test_results
      });

      simulatorContext.setSelectedBacktest(res.test_results[0]);

      simulatorContext.setInloading(false);

      //console.log("API backtest result: ", res);
    } catch (e) {
      console.log("API backtest error", e);
    }
  }

  return (
    <div>
      <div className="ui three column doubling grid">
        <div className="column three wide">
          Tradepairs: Symbol - Candlesize(in sec)
          <DropdownWrap
            field_name="tradepairs_dropdown"
            change_callback={simulatorContext.selectTradepair}
            options={simulatorContext.tradepairs.map((elem, index) => {
              return {
                key: index,
                value: elem.guid,
                text: `${elem.symbol} - (${elem.interval_sec})`
              };
            })}
          />
          Strategies:
          <DropdownWrap
            field_name="strategy_dropdown"
            change_callback={simulatorContext.selectStrategy}
            options={simulatorContext.strategies.map((elem, index) => {
              return {
                key: index,
                value: elem.guid,
                text: `${elem.name}`
              };
            })}
          />
          Strategy details:
          <div>{simulatorContext.selectedStrategy.desc}</div>
          Candle limit:
          <DropdownWrap
            field_name="candle_limit_dropdown"
            change_callback={simulatorContext.selectCandleLimit}
            options={[
              {
                key: 0,
                value: 400,
                text: "400 ~ 1 day"
              },
              {
                key: 1,
                value: 1000,
                text: "1000 ~ 3 day"
              },
              {
                key: 2,
                value: 3000,
                text: "3000 ~ 10 day"
              }
            ]}
          />
          Simulation count:
          <DropdownWrap
            field_name="candle_limit_dropdown"
            change_callback={simulatorContext.selectSimulationCount}
            options={[
              {
                key: 0,
                value: 100,
                text: "100"
              },
              {
                key: 1,
                value: 200,
                text: "200"
              },
              {
                key: 2,
                value: 300,
                text: "300"
              }
            ]}
          />
          Start:
          <ButtonWrap
            text="Start optimalization"
            onClick_callback={runBacktest}
            loading={simulatorContext.inloading}
          />
          Optimalization results:
          <DropdownWrap
            field_name="strategy_dropdown"
            change_callback={simulatorContext.selectBacktest}
            options={simulatorContext.backtest.test_result.map(
              (elem, index) => {
                return {
                  key: index,
                  value: index,
                  text: `Sum: ${_.round(elem.sum_performance, 2)}, Action: ${
                    elem.num_actions
                  }`
                };
              }
            )}
          />
          Config:
          <div>
            <Form>
              <TextArea
                value={JSON.stringify(simulatorContext.selectedBacktest.config)}
                style={{ minHeight: 100 }}
              />
            </Form>
          </div>
        </div>
        <div className="column nine wide">
          <Candlechart
            loading={simulatorContext.inloading}
            series_data={simulatorContext.backtest.candlechart}
            trade_data={simulatorContext.selectedBacktest}
          />
        </div>
      </div>
      <div className="ui">
        <div className="column ten wide">
          Tradelogs:
          <Tradelog trade_data={simulatorContext.selectedBacktest} />
        </div>
      </div>
    </div>
  );
}

export default DefaultPage;
