import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = props => {
  // Needed for return the Context Consumer
  const { children } = props;

  // Use State to keep the values
  const [tradepairs, setTradepairs] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState([]);
  const [simulationcount, setSimulationcount] = useState(300);

  const [candlechart, setCandlechart] = useState([]);
  const [backtestresult, setBacktestresult] = useState([]);

  const [backtest, setBacktest] = useState({
    candlechart: [],
    test_result: []
  });

  const [selectedBacktest, setSelectedBacktest] = useState([]);
  const [inloading, setInloading] = useState(false);

  const [simulator_options, setSimulator_options] = useState({
    symbol: "ETHBTC",
    exchange: "binance",
    interval: 300,
    candle_limit: 1000,
    test_count: simulationcount,
    strategy: "cci_william",
    config: {}
  });

  const [actions, setActions] = useState([]);

  const selectTradepair = (e, invoker) => {
    let new_simulator_options = simulator_options;

    let selected_tradepair = tradepairs.filter(
      elem => elem.guid === invoker.value
    )[0];

    new_simulator_options.symbol = selected_tradepair.symbol;
    new_simulator_options.exchange = selected_tradepair.exchange;
    new_simulator_options.interval = selected_tradepair.interval_sec;

    setSimulator_options(new_simulator_options);
  };

  const selectStrategy = (e, invoker) => {
    let new_simulator_options = simulator_options;

    let selected_strategy = strategies.filter(
      elem => elem.guid === invoker.value
    )[0];

    setSelectedStrategy(selected_strategy);

    new_simulator_options.strategy = selected_strategy.name;
    new_simulator_options.config = selected_strategy.config;

    setSimulator_options(new_simulator_options);
  };

  const selectCandleLimit = (e, invoker) => {
    let new_simulator_options = simulator_options;

    new_simulator_options.candle_limit = invoker.value;

    setSimulator_options(new_simulator_options);
  };

  const selectSimulationCount = (e, invoker) => {
    let new_simulator_options = simulator_options;

    new_simulator_options.test_count = invoker.value;

    setSimulationcount(invoker.value);
    setSimulator_options(new_simulator_options);
  };

  const selectBacktest = (e, invoker) => {
    setSelectedBacktest(backtest.test_result[invoker.value]);
  };

  // Make the context object:
  const usersContext = {
    tradepairs,
    setTradepairs,
    strategies,
    setStrategies,
    inloading,
    setInloading,
    backtestresult,
    setBacktestresult,
    selectedBacktest,
    setSelectedBacktest,

    backtest,
    setBacktest,

    simulationcount,
    selectedStrategy,

    candlechart,
    setCandlechart,
    actions,
    setActions,

    simulator_options,

    selectTradepair,
    selectStrategy,
    selectCandleLimit,
    selectSimulationCount,
    selectBacktest
  };

  // pass the value in provider and return
  return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
