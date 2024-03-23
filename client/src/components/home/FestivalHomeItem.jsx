const FestivalHomeItem = ({ id, posterUrl, name, date }) => {
  return (
    <div className='w-[120px]'>
      <img className='w-full rounded-md' src={posterUrl} />
      <div className='truncate'>{name}</div>
      <div className='text-sm text-zinc-500'>
        일시 : {new Date(date).toLocaleDateString()}
      </div>
    </div>
  );
};
export default FestivalHomeItem;
