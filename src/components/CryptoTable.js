import React, { useEffect, useState } from 'react';
import bitfinexService from '../services/bitfinexService';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID'},
  {
    field: 'image',
    headerName: 'Token',
    renderCell: (params) => {
      const symbol = params.row[0].slice(1).replace('USD','');
      return <img src={`https://static.bitfinex.com/images/icons/${symbol}.svg`} alt={symbol} style={{ width: '32px', height: '32px' }} />
    },
  },
  {
    field: '10',
    headerName: 'Last Price',
    valueFormatter: (params) => `${params} USD`,
  },
  { field: '9', headerName: '24h'},
  {
    field: '3',
    headerName: '24 High',
    valueFormatter: (params) => `${params} USD`,
  }, // docs say [12] but that index doesn't exist
  {
    field: '4',
    headerName: '24 Low',
    valueFormatter: (params) => `${params} USD`,
  },
  {
    field: '5',
    headerName: '24 Vol',
    valueFormatter: (params) => `${params} USD`,
  },
];

const CryptoTable = () => {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const data = await bitfinexService.getAllTickers();
        const tickersWithImages = await addSymbolImages(data);
        setTickers(tickersWithImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickers();
  }, []);

  const addSymbolImages = async (data) => {
    const symbols = data.map((ticker) => ticker[0]);
    const symbolImageMap = await fetchSymbolImages(symbols);
    return data.map((ticker, index) => ({
      id: index + 1,
      image: symbolImageMap[ticker[0]] || '',
      ...ticker,
    }));
  };

  const fetchSymbolImages = async (symbols) => {
    const symbolImageMap = {};
    try {
      const response = await axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`);
      const coinList = response.data.Data;
      symbols.forEach((symbol) => {
        if (coinList[symbol] && coinList[symbol].ImageUrl) {
          symbolImageMap[symbol] = `https://www.cryptocompare.com${coinList[symbol].ImageUrl}`;
        }
      });
    } catch (error) {
      console.error('Error fetching symbol images:', error);
    }
    return symbolImageMap;
  };

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={tickers} columns={columns} pageSize={10} />
    </div>
  );
};

export default CryptoTable;






