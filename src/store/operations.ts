import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

/*     AUTH SLICE     */

export const fetchImages = createAsyncThunk('feed/fetchImages', async () => {
  const items = await Promise.allSettled(
    Array.from({length: 10}, async () => {
      const randomId = Math.floor(Math.random() * 1050) + 1;

      try {
        const imageUri = `https://picsum.photos/id/${randomId}/400/200`;

        const imageInfoResponse = await axios.get(
          `https://picsum.photos/id/${randomId}/info`,
        );
        const {author = 'Unknown'} = imageInfoResponse.data;

        return {
          id: randomId,
          uri: imageUri,
          author,
        };
      } catch (error) {
        return null;
      }
    }),
  );

  const fulfilledItems = items
    .filter(
      (
        result,
      ): result is PromiseFulfilledResult<{
        id: number;
        uri: string;
        author: string;
      }> => result.status === 'fulfilled' && result.value !== null,
    )
    .map(result => result.value);

  return fulfilledItems;
});

export const fetchRandomUser = createAsyncThunk(
  'auth/fetchRandomUser',
  async () => {
    const randomId = Math.floor(Math.random() * 12) + 1;
    const response = await axios.get(`https://reqres.in/api/users/${randomId}`);
    const {first_name, last_name, avatar} = response.data.data;
    return {first_name, last_name, avatar};
  },
);
