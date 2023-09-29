import { EntryProps } from '../types';

const Entry = ({ entry }: EntryProps) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      visibility: {entry.visibility}
      <br />
      weather: {entry.weather}
    </div>
  );
};

export default Entry;
