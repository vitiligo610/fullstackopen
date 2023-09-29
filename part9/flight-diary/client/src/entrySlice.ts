import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { DiaryEntry, DiaryEntryState, NewDiaryEntry } from './types';

const initialState: DiaryEntryState = {
  data: [],
  status: 'idle',
  error: null
};

const baseUrl = '/api/diaries';

export const getAllEntries = createAsyncThunk(baseUrl, async (_, thunkAPI) => {
  try {
    console.log(thunkAPI);
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    const data = response.data as DiaryEntry[];
    return data;
  } catch (error: any) {
    thunkAPI.rejectWithValue(`Something unexpected happened: ${error.message}`);
  }
});

export const createEntry = createAsyncThunk(
  `${baseUrl}/add`,
  async (data: NewDiaryEntry, thunkAPI) => {
    try {
      const response = await axios.post<DiaryEntry>(`${baseUrl}/add`, data);
      const createdEntry = response.data;
      console.log(createdEntry);

      console.log(thunkAPI.getState());
      return createdEntry;
    } catch (error: any) {
      thunkAPI.rejectWithValue(`Error creating new entry: ${error.message}`);
    }
  }
);

const entrySlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload as DiaryEntry[];
      })
      .addCase(getAllEntries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An error occured';
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.data.push(action.payload as DiaryEntry);
      });
  }
});

export default entrySlice.reducer;
