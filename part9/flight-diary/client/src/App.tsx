import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { getAllEntries } from './entrySlice';
import Entries from './components/Entries';
import EntryForm from './components/EntryForm';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllEntries());
  }, [dispatch]);

  const { status, data } = useAppSelector((state) => state.entries);
  console.log(data)

  return <div>
    <h1>Flight diary entries</h1>
    <EntryForm />
    <Entries data={data} status={status} />
  </div>;
};

export default App;
