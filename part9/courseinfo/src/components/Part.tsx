import { PartProps } from '../types';

const Part = ({ part }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const renderPart = () => {
    switch (part.kind) {
      case 'basic':
        return (
          <>
            <em>{part.description}</em>
          </>
        );
      case 'group':
        return <>project exercises {part.groupProjectCount}</>;
      case 'background':
        return (
          <>
            <em>{part.description}</em><br />
            submit to {part.backgroundMaterial}
          </>
        );
      case 'special':
        return (
          <>
            <em>{part.description}</em><br />
            required skills {part.requirements.join(', ')}
          </>
        )
      default:
        assertNever(part);
    }
  };

  return (
    <div>
      <h3>{part.name}</h3>
      {renderPart()}
      <hr />
    </div>
  );
};

export default Part;
