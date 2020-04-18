import axios from "axios";

export class StockAPI {
  constructor() {
    this.api_url = "http://localhost:3100";
  }

  async run_optimize(config) {
    let res = await axios.post(`${this.api_url}/backtest/optimize`, config);

    return res.data;
  }

  async get_all_tradepairs() {
    let res = await axios.get(`${this.api_url}/tradepairs/all`);

    return res.data;
  }

  async get_all_strategies() {
    let res = await axios.get(`${this.api_url}/strategy/all`);

    return res.data;
  }
}

export default new StockAPI();
