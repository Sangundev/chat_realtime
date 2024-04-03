const Message = () => {
  return (
   <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-
                157904/Apple-iPhone-15_-blue_featured-image-packshot-review.jpg" alt="User Avatar" />
            </div>
        </div>
        <div className={`chat-bubble text-white pb-2`}>Hi hi hi hi </div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
   </div>
  )
}

export default Message