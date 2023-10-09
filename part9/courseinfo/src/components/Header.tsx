import { HeaderProps } from '../types'

// ({ name }: { name: string })

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

export default Header;