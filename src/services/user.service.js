import axios from "axios"
import authHeader from "./auth-header"

// const HOSTNAME = "ec2-13-239-97-36.ap-southeast-2.compute.amazonaws.com:8000"
const HOSTNAME = "ec2-3-26-8-123.ap-southeast-2.compute.amazonaws.com:8000"
const QUERY_URL = "http://" + HOSTNAME + "/astrology/query/"
const REPLY_URL = "http://" + HOSTNAME + "/astrology/reply/"
const USER_URL = "http://" + HOSTNAME + "/astrology/user/"
const ASTROLOGER_URL = "http://" + HOSTNAME + "/astrology/astrologer/"
const CLIENT_URL = "http://" + HOSTNAME + "/astrology/client/"

//<<<<<<<<<<<< Query Apis >>>>>>>>>>>>>>

const getAllQueries = async () => {
  return await axios.get(QUERY_URL + "all", { headers: authHeader() })
}

const getUserQueries = async (userId) => {
  return await axios.get(QUERY_URL + "user/" + userId, { headers: authHeader() })
}

const getAstrologerQueries = async (astrologerId) => {
  return await axios.get(QUERY_URL + "astrologer/" + astrologerId, { headers: authHeader() })
}

const getAstrologerChat = async (userId, astrologerId) => {
  return await axios.get(QUERY_URL + "astrologer/chat/" + userId + "/" + astrologerId, { headers: authHeader() })
}

const getNewMessage = async (userId, userRole) => {
  return await axios.get(QUERY_URL + "new/message/" + userId + "/" + userRole, { headers: authHeader() })
}

const getUsersForAstrologer = async (astrologerId) => {
  return await axios.get(QUERY_URL + "astrologer/users/" + astrologerId, { headers: authHeader() })
}

const addQuery = async (userId, date, query, selectedIds) => {
  return await axios.post(QUERY_URL + "add", 
                    { userId : userId, date : date, query : query, astrologerIds : selectedIds }, 
                    { headers: authHeader() })
}

const updateQuery = async (id, date, query) => {
  return await axios.put(QUERY_URL + "update",
                    { id : id, date : date, query : query },
                    { headers : authHeader() })
}

const updateQuerySeen = async (id) => {
  return await axios.put(QUERY_URL + "update", { id : id }, { headers : authHeader() })
}

const deleteQuery = async (id) => {
  return await axios.delete(QUERY_URL + "delete/" + id, { headers : authHeader() })
}

//<<<<<<<<<<<< Reply Apis >>>>>>>>>>>>>>

const addReply = async (queryId, userId, date, reply, userRole) => {
  return await axios.post(REPLY_URL + "add", 
                    { queryId : queryId, userId : userId, date : date, reply : reply, userRole : userRole }, 
                    { headers: authHeader() })
}

const updateReply = async (id, date, reply) => {
  return await axios.put(REPLY_URL + "update",
                    { id : id, date : date, reply : reply },
                    { headers : authHeader() })
}

const updateReplySeen = async (id, userRole) => {
  return await axios.put(REPLY_URL + "update",
                    { id : id, userRole : userRole },
                    { headers : authHeader() })
}

const deleteReply = async (id) => {
  return await axios.delete(REPLY_URL + "delete/" + id, { headers : authHeader() })
}

//<<<<<<<<<<<< User Apis >>>>>>>>>>>>>>

const getUser = async (userId) => {
  return await axios.get(USER_URL + userId, { headers: authHeader() })
}

const getAllUnapprovedAstrologer = async () => {
  return await axios.get(USER_URL + "astrologer/unapproved", { headers: authHeader() })
}

const isUsernameExist = async (username) => {
  return await axios.get(USER_URL + "username/" + username)
}

const getLoggedUsers = async () => {
  return await axios.get(USER_URL + "loggedUsers", { headers: authHeader() })
}

const approveAstrologer = async (id) => {
  return await axios.put(USER_URL + "approve/" + id, {}, { headers: authHeader() })
}

const denyAstrologer = async (id) => {
  return await axios.delete(USER_URL + "deny/" + id, { headers: authHeader() })
}

const deleteUser = async (id) => {
  return await axios.delete(USER_URL + "delete/" + id, { headers: authHeader() })
}

//<<<<<<<<<<<< Astrologer Apis >>>>>>>>>>>>>>

const getAllAstrologers = async () => {
  return await axios.get(ASTROLOGER_URL + "all", { headers: authHeader() })
}

//<<<<<<<<<<<< Client Apis >>>>>>>>>>>>>>

const getAllClients = async () => {
  return await axios.get(CLIENT_URL + "all", { headers: authHeader() })
}

const UserService = {
  getAllQueries,
  getUserQueries,
  getAstrologerQueries,
  getAstrologerChat,
  getNewMessage,
  getUsersForAstrologer,
  addQuery,
  updateQuery,
  updateQuerySeen,
  deleteQuery,
  addReply,
  updateReply,
  updateReplySeen,
  deleteReply,
  getUser,
  getAllUnapprovedAstrologer,
  isUsernameExist,
  getLoggedUsers,
  approveAstrologer,
  denyAstrologer,
  deleteUser,
  getAllAstrologers,
  getAllClients
}

export default UserService
