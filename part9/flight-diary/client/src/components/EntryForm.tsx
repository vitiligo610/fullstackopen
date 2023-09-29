import React from 'react';
import { useAppDispatch, useField } from '../hooks';
import { NewDiaryEntry, Visibility, Weather } from '../types';
import { createEntry } from '../entrySlice';

const EntryForm = () => {
  const dispatch = useAppDispatch();
  const date = useField('date');
  const visibility = useField('radio');
  const weather = useField('radio');
  const comment = useField('text');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('submitting form');

    const entry = {
      date: date.value,
      visibility: visibility.value,
      weather: weather.value,
      comment: comment.value
    } as NewDiaryEntry;
    console.log(entry);
    dispatch(createEntry(entry));
    console.log('after submitting');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        date{' '}
        <input
          type={date.type}
          onChange={date.onChange}
          value={date.value}
          required
        />
        <br />
        visibility{' '}
        {Object.values(Visibility).map((v) => (
          <label key={v}>
            <input
              name='visibility'
              type={visibility.type}
              onChange={visibility.onChange}
              value={v}
              required
            />
            {v}
          </label>
        ))}
        <br />
        weather{' '}
        {Object.values(Weather).map((v) => (
          <label key={v}>
            <input
              name='weather'
              type={weather.type}
              onChange={weather.onChange}
              value={v}
              required
            />
            {v}
          </label>
        ))}
        <br />
        comment{' '}
        <input
          type={comment.type}
          onChange={comment.onChange}
          value={comment.value}
        />
        <br />
        <button>submit</button>
      </form>
    </div>
  );
};

export default EntryForm;
