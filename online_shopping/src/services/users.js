import mongoose from "mongoose";
import config from "../utils/config.js";
const User = mongoose.model("User");

const fetchUsers = (sort, order, page, q, role) => {
	const skipClause = (page - 1) * config.PAGE_SIZE;
	const filterClause = {};

	if (role) {
		filterClause.role = role;
	}
	if (q) {
		filterClause.name = {
			$regex: q,
			$options: "i",
		};
	}

	console.log(filterClause);
	const sortClause = {
		[sort]: order === "desc" ? -1 : 1,
	};

	return User.find(filterClause)
	.select('-password')
		.sort(sortClause)
		.skip(skipClause)
		.limit(config.PAGE_SIZE);
};

const fetchUserById = (_id) => {
	return User.findById(_id);
};

const addUser = (user) => {
	return User.create(user);
};

const updateUser = (_id, newUserDetails) => {
	return User.findByIdAndUpdate(_id, newUserDetails, { new: true });
};

const removeUser = (_id) => {
	return User.findByIdAndRemove(_id);
};

export { fetchUsers, fetchUserById, addUser, updateUser, removeUser };
