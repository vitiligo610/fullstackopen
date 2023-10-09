import { Diagnosis, HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntry;
  diagnosis: Diagnosis[];
}

const Hospital = ({ entry, diagnosis }: Props) => {
  return (
    <div>
      {entry.date}<LocalHospitalIcon /><br />
      <em>{entry.description}</em>
      <ul>
        {diagnosis?.map((d) => (
          <li key={d.code}>{d.code} {d.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Hospital;
