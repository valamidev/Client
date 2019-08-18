import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = props => {
  // Needed for return the Context Consumer
  const { children } = props;

  // Use State to keep the values
  // Menu values
  const [exchange, setExchange] = useState("");
  const [tradepairs, setTradepairs] = useState([]);

  const [filteredTradepairs, setFilteredTradepairs] = useState([]);

  const [strategies, setStrategies] = useState([]);
  const [candle_limit, setCandle_limit] = useState(1000);

  const [selectedStrategy, setSelectedStrategy] = useState(0);
  const [simulationcount, setSimulationcount] = useState(100);

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
    candle_limit: 1000,
    test_count: simulationcount,
    strategy: "bb_pure",
    config: {}
  });

  const [actions, setActions] = useState([]);

  // Helper functions

  const selectExchange = (e, invoker) => {
    let new_simulator_options = simulator_options;

    setExchange(invoker.value);
    setFilteredTradepairs(tradepairs.filter(e => e.exchange === invoker.value));

    new_simulator_options.exchange = invoker.value;

    setSimulator_options(new_simulator_options);
  };

  const updateTradepairs = () => {
    setFilteredTradepairs(tradepairs.filter(e => e.exchange === exchange));
  };

  const selectSymbol = (e, invoker) => {
    let new_simulator_options = simulator_options;

    let selected_tradepair = filteredTradepairs.filter(
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

    setCandle_limit(invoker.value);

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
    exchange,
    filteredTradepairs,
    setFilteredTradepairs,
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

    updateTradepairs,

    simulator_options,

    selectExchange,
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
