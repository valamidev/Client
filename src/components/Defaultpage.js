import React, { useContext, useEffect } from "react";
import { Form, TextArea } from "semantic-ui-react";
import _ from "lodash";
import StockAPI from "../stockml_api";
import { SimulatorContext } from "../contexts";
// Components
import DropdownWrap from "./Dropdown";
import ButtonWrap from "./Button";
import Candlechart from "./Candlechart";
import Tradelog from "./Tradelog";
import ButtonGroup from "./ButtonGroup";
// Components
// Enums
import interval_enum from "../Enums/interval_enum";
import candle_limit_enum from "../Enums/candle_limit_enum";
import simulation_count_enum from "../Enums/simulation_count_enum";
// Enums

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

      console.log("Run backtest result: ", simulatorContext.simulator_options);

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

  const padding = { padding: "0.5rem" };

  return (
    <div>
      <div className="ui three column doubling grid">
        <div className="column three wide">
          <div style={padding}>Exchange: Binance</div>
          <div style={padding}>
            Symbol:
            <DropdownWrap
              field_name="tradepairs_dropdown"
              change_callback={simulatorContext.selectSymbol}
              options={simulatorContext.tradepairs.map((elem, index) => {
                return {
                  key: index,
                  value: index,
                  text: `${elem.symbol}`
                };
              })}
            />
          </div>
          <div style={padding}>
            Timeframe:
            <div style={{ padding: "0.5rem" }}>
              <ButtonGroup
                select_callback={simulatorContext.selectInterval}
                options={interval_enum}
                selected={simulatorContext.simulator_options.interval}
              />
            </div>
          </div>
          <div style={padding}>
            Strategies:
            <DropdownWrap
              field_name="strategy_dropdown"
              change_callback={simulatorContext.selectStrategy}
              options={simulatorContext.strategies.map((elem, index) => {
                return {
                  key: index,
                  value: index,
                  text: `${elem.name}`
                };
              })}
            />
          </div>
          <div style={padding}>
            Strategy details:
            <div>{simulatorContext.selectedStrategy.desc}</div>
          </div>
          <div style={padding}>
            Candle limit:
            <ButtonGroup
              select_callback={simulatorContext.selectCandleLimit}
              options={candle_limit_enum}
              selected={simulatorContext.simulator_options.candle_limit}
            />
          </div>
          <div style={padding}>
            Simulation count:
            <ButtonGroup
              select_callback={simulatorContext.selectSimulationCount}
              options={simulation_count_enum}
              selected={simulatorContext.simulationcount}
            />
          </div>
          <div style={padding}>
            Start:
            <ButtonWrap
              text="Start optimalization"
              onClick_callback={runBacktest}
              loading={simulatorContext.inloading}
            />
          </div>
          <div style={padding}>
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
          </div>
          <div style={padding}>
            Config:
            <div>
              <Form>
                <TextArea
                  value={JSON.stringify(
                    simulatorContext.selectedBacktest.config
                  )}
                  style={{ minHeight: 100 }}
                />
              </Form>
            </div>
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
          <div style={padding}>
            Tradelogs:
            <Tradelog trade_data={simulatorContext.selectedBacktest} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultPage;
