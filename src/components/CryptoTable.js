import React, { useEffect, useState } from 'react';
import bitfinexService from '../services/bitfinexService';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'image',
    headerName: 'Symbol',
    width: 150,
    renderCell: (params) => (
      <img src={params.value} alt={params.row[0]} style={{ width: '32px', height: '32px' }} />
    ),
  },
  { field: '1', headerName: 'Bid', width: 150 },
  { field: '2', headerName: 'Bid Size', width: 150 },
  { field: '3', headerName: 'Ask', width: 150 },
  { field: '4', headerName: 'Ask Size', width: 150 },
  { field: '5', headerName: 'Daily Change', width: 150 },
  { field: '6', headerName: 'Relative Daily Change (%)', width: 250 },
  { field: '7', headerName: 'Last Price', width: 150 },
  { field: '8', headerName: 'Volume', width: 150 },
  { field: '9', headerName: 'High', width: 150 },
  { field: '10', headerName: 'Low', width: 150 },
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






