import { useNavigate } from 'react-router';

const FestivalViewAllItem = ({ id, name, date, location, posterUrl, lineup }) => {
  const nav = useNavigate();

  const onClickItem = () => {
    nav(`/festival/${id}`);
  };

  const dateFormat = (festivalDate) => {
    return (
      festivalDate.getFullYear() +
      '.' +
      (festivalDate.getMonth() + 1 < 9 ? '0' + (festivalDate.getMonth() + 1) : festivalDate.getMonth() + 1) +
      '.' +
      (festivalDate.getDate() < 9 ? '0' + festivalDate.getDate() : festivalDate.getDate())
    );
  };

  return (
    <div className='flex w-full overflow-hidden gap-x-4' onClick={onClickItem}>
      <div className='flex items-center justify-center w-2/5 overflow-hidden rounded-md bg-zinc-100'>
        <img className='object-cover rounded-md' src={posterUrl} />
      </div>
      <div className='w-3/5 '>
        <div className='mb-4 text-lg font-semibold'>{name}</div>
        <div className='flex items-center'>
          <div className='text-sm font-semibold text-zinc-400'>일시 ♪</div>
          <div className='ml-2'>{dateFormat(new Date(date))}</div>
        </div>
        <div className='flex items-center mb-2'>
          <div className='text-sm font-semibold text-zinc-400'>장소 ♪</div>
          <div className='ml-2 text-ourBrightIndigo'>{location}</div>
        </div>
        <div>
          <div className='text-sm text-zinc-500'>주요 라인업</div>
          <div className='font-medium'>{lineup}</div>
        </div>
      </div>
    </div>
  );
};
export default FestivalViewAllItem;
