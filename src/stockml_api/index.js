import axios from "axios";

export class StockAPI {
  constructor() {
    this.api_url = "http://localhost:3001";
  }

  async run_massbacktest(config) {
    let res = await axios.post(`${this.api_url}/backtest/masstest`, config);

    return res.data;
  }

  async get_all_tradepairs() {
    let res = await axios.get(`${this.api_url}/candle/tradepairs`);

    return res.data;
  }

  async get_all_strategies() {
    let res = await axios.get(`${this.api_url}/strategies/all`);

    return res.data;
  }
}

export default new StockAPI();
