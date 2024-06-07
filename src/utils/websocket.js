import { setMarketData, setConnectionStatus } from '../features/marketData/marketDataSlice';

const subscribeToOrderBook = (dispatch, precision) => {
  const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  ws.onopen = () => {
    dispatch(setConnectionStatus(true));
    ws.send(JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD',
      prec: precision,
      freq: 'F0',
      len: 25,
    }));
  };

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (Array.isArray(data) && data[1] !== 'hb') {
      const orderData = data[1];
      const asks = orderData.filter(order => order[2] > 0);
      const bids = orderData.filter(order => order[2] < 0);
      dispatch(setMarketData({ asks, bids }));
    }
  };

  ws.onclose = () => {
    dispatch(setConnectionStatus(false));
  };

  return ws;
};

export default subscribeToOrderBook;
