const BASED_URL = 'https://api.coinpaprika.com/v1';

// return json data
export function fetchCoins() {
  return fetch(`${BASED_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASED_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASED_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // current
  const startDate = endDate - 60 * 60 * 24 * 7 * 2; // 2 week ago
  return fetch(
    `${BASED_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
