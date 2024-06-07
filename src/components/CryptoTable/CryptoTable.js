import React from 'react';
import { useGetAllTickersQuery } from '../../services/bitfinexService';
import { DataGrid } from '@mui/x-data-grid';
import './CryptoTable.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'image',
    headerName: 'Token',
    renderCell: (params) => {
      const symbol = params.row[0].slice(1).replace('USD','');
      return <img src={`https://static.bitfinex.com/images/icons/${symbol}.svg`} alt={symbol} style={{ width: '32px', height: '32px' }} />
    },
    width: 100
  },
  {
    field: '10',
    headerName: 'Last Price',
    valueFormatter: (params) => `${params} USD`,
    width: 150
  },
  { field: '9', headerName: '24h', width: 100 },
  {
    field: '3',
    headerName: '24 High',
    valueFormatter: (params) => `${params} USD`,
    width: 150
  },
  {
    field: '4',
    headerName: '24 Low',
    valueFormatter: (params) => `${params} USD`,
    width: 150
  },
  {
    field: '5',
    headerName: '24 Vol',
    valueFormatter: (params) => `${params} USD`,
    width: 150
  },
];

  const CryptoTable = () => {
  const { data: tickers, error, isLoading, refetch } = useGetAllTickersQuery(undefined, {
    pollingInterval: 3000, 
    skipPollingIfUnfocused: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <button onClick={refetch()}>Reconnect</button>;

  const rowsWithIds = tickers.map((ticker, index) => ({
    ...ticker,
    id: index + 1,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rowsWithIds} columns={columns} pageSize={10} />
    </div>
  );
};

export default CryptoTable;