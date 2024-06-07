import axios from 'axios';

const getAllTickers = async () => {
  try {
    const response = await axios.get('/v2/tickers?symbols=ALL');
    return response.data;
  } catch (error) {
    console.error('Error fetching tickers:', error);
    throw error;
  }
};

export default {
  getAllTickers,
};
