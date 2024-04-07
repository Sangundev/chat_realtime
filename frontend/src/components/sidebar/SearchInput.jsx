import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState(null); // Trạng thái lưu trữ kết quả tìm kiếm
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
			setSearchResult(null); // Đặt kết quả tìm kiếm về null sau khi đã chọn cuộc trò chuyện
		} else {
			setSearchResult("No such user found!"); // Lưu trữ thông báo không tìm thấy người dùng
		}
	};

	return (
		<div className='relative'>
			<form onSubmit={handleSubmit} className='flex items-center gap-2'>
				<input
					type='text'
					placeholder='Search…'
					className='input input-bordered rounded-full'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
					<IoSearchSharp className='w-6 h-6 outline-none' />
				</button>
			</form>
			{searchResult && (
				<div className='absolute top-full left-0 bg-white rounded shadow p-2 mt-2'>
					{searchResult}
				</div>
			)}
		</div>
	);
};

export default SearchInput;
