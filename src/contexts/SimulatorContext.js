import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = props => {
  // Needed for return the Context Consumer
  const { children } = props;

  // Use State to keep the values
  // Menu values
  const [exchange, setExchange] = useState("binance");
  const [tradepairs, setTradepairs] = useState([]);
  const [interval, setInterval] = useState(900);
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
    symbol: "BTC/USDT",
    exchange,
    interval,
    candle_limit: 1000,
    test_count: simulationcount,
    strategy: "cci_william",
    config: {}
  });

  const [actions, setActions] = useState([]);

  // Helper functions

  const selectSymbol = (e, invoker) => {
    let new_simulator_options = simulator_options;

    let selected_tradepair = tradepairs.filter(
      (e, index) => index === invoker.value
    )[0];

    new_simulator_options.symbol = selected_tradepair.symbol;

    setSimulator_options(new_simulator_options);
  };

  const selectStrategy = (e, invoker) => {
    let new_simulator_options = simulator_options;

    let selected_strategy = strategies.filter(
      (e, index) => index === invoker.value
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

    selectSymbol,
    selectStrategy,
    selectCandleLimit,
    selectSimulationCount,
    selectBacktest
  };

  // pass the value in provider and return
  return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
