import { ComponentProps } from 'react';
import { IoMdRefresh } from 'react-icons/io';

interface Props extends ComponentProps<'button'> {}

const RefreshButton = ({ onClick }: Props) => {
  return (
    <button className="chart-refresh-btn" onClick={onClick}>
      <IoMdRefresh size="18" color="#efefef" />
    </button>
  );
};

export default RefreshButton;
