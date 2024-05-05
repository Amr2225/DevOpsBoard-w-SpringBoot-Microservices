const Comments = ({ userName, role, comment }) => {
  return (
    <div>
      <div className='flex gap-1 place-items-center justify-start'>
        <span className='w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full text-sm text-center grid place-content-center mr-1 capitalize'>
          {userName[0]}
        </span>
        <h5 className='capitalize'>{userName}</h5>
        <h6 className='text-neutral-100/40 text-sm ml-0.5'>{role}</h6>
      </div>
      <div>
        <p className='ml-8 mb-8'>{comment}</p>
      </div>
    </div>
  );
};

export default Comments;
