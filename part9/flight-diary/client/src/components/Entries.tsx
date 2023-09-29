import { EntriesProps } from '../types';
import Entry from './Entry';

const Entries = ({ data, loading }: EntriesProps) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {loading && (
        <h2>
          <em>Loading data...</em>
        </h2>
      )}
      {!loading &&
        data.map((entry) => <Entry key={entry.id} entry={entry} />)}
    </div>
  );
};

export default Entries;
