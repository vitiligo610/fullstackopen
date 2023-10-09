import { Alert, Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';

import AddEntryForm from './AddEntryForm';
import { Diagnosis, NewEntry } from "../../types";

interface Props {
  modalOpen: boolean;
  onSubmit: (values: NewEntry) => void;
  onClose: () => void;
  diagnoses: Diagnosis[];
  error?: string;
}

const AddEntryModal = ({ modalOpen, onSubmit, error, onClose, diagnoses }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
  <DialogTitle>Add a new Entry</DialogTitle>
  <Divider />
  <DialogContent>
    {error && <Alert severity="error">{error}</Alert>}
    <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
  </DialogContent>
  </Dialog>
);

export default AddEntryModal;