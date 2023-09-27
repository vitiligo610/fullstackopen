import { ContentProps } from '../types';
import Part from './Part';

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part, id) => (
        <Part key={id} part={part} />
      ))}
    </div>
  );
};

export default Content;
