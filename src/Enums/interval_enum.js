const interval_enum = [
  { name: "1m", interval: 60 },
  { name: "2m", interval: 60 * 2 },
  { name: "3m", interval: 60 * 3 },
  { name: "5m", interval: 60 * 5 },
  { name: "10m", interval: 60 * 10 },
  { name: "15m", interval: 60 * 15 },
  { name: "20m", interval: 60 * 20 },
  { name: "30m", interval: 60 * 30 },
  { name: "1h", interval: 3600 },
  { name: "2h", interval: 3600 * 2 },
  { name: "3h", interval: 3600 * 3 },
  { name: "6h", interval: 3600 * 6 },
  { name: "12h", interval: 3600 * 12 },
  { name: "1D", interval: 86400 },
  { name: "2D", interval: 86400 * 2 },
  { name: "3D", interval: 86400 * 3 },
  { name: "1W", interval: 86400 * 7 }
];

export default interval_enum;
