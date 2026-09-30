import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000";
const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getAssetUrl = (path) => {
  if (!path) return "";
  if (/^(blob:|data:|https?:\/\/)/i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || "Network error";
    toast.error(errorMessage);
    return Promise.reject(error);
  },
);

// post the student to the db
export const createStudent = async (studentsPayload) => {
  try {
    return await api.post("/students", studentsPayload);
  } catch (err) {
    console.log(err.message);
  }
};

//get the student from backend
export const getStudent = async () => {
  try {
    const res = await api.get("/students");

    return res;
  } catch (err) {
    console.log(err.message);
  }
};

//get student by Id

export const getStudentById = async (id) => {
  try {
    const res = await api.get(`/students/${id}`);

    return res;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateStudent = async (id, payload) => {
  try {
    const res = await api.patch(`/students/${id}`, payload);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStudent = async (id) => {
  try {
    const res = await api.delete(`/students/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postStaffs = async (payload) => {
  try {
    const res = await api.post("/staffs", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStaffs = async () => {
  try {
    const res = await api.get("/staffs");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStaffsById = async (id) => {
  try {
    const res = await api.get(`/staffs/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStaffs = async (id) => {
  try {
    const res = await api.delete(`/staffs/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const patchStaffs = async (id, payload) => {
  try {
    const res = await api.patch(`/staffs/${id}`, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (payload) => {
  try {
    const res = await api.post("/user", payload);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (payload) => {
  try {
    const res = await api.post("/user/login", payload);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/user/logout")
    return res;
    
  } catch (error) {
    console.log(error.message);
  }
};

export const getMe = async () => {
  return await api.get("/user/me");
};



//get User

export const getUser = async () => {
  return await api.get("/user");
};

export const getUserById = async (id) => {
  return await api.get(`/user/${id}`);
};

export const deleteUser = async (id) => {
  return await api.delete(`/user/${id}`);
};

// // updateReasonHeading,
//   postChooseReason,
//   deleteChooseReason,
//   updateChooseReason,
//   getReasonHeading,
//   getChooseReason,
//   getChooseReasonById

export const updateReasonHeading = async (payload) => {
  const res = await api.patch("/chooseReasons/heading", payload);
  return res.data;
};

export const getReasonHeading = async () => {
  const res = await api.get("/chooseReasons/heading");
  return res.data;
};

export const postChooseReason = async (payload) => {
  const res = await api.post("/chooseReasons", payload);
  return res.data;
};

export const updateChooseReason = async (id, payload) => {
  const res = await api.patch(`/chooseReasons/${id}`, payload);
  return res.data;
};

export const deleteChooseReason = async (id) => {
  const res = await api.delete(`/chooseReasons/${id}`);
  return res.data;
};

export const getChooseReasonById = async (id) => {
  const res = await api.get(`/chooseReasons/${id}`);
  return res.data;
};

export const getChooseReason = async () => {
  const res = await api.get("/chooseReasons");
  return res.data;
};

export const createDepartment=async(payload)=>{
  const res=await api.post("/department",payload)
  return res.data
}

export const getDepartment=async()=>{
  const res=await api.get("/department")
  return res
}



export const createDesignation=async(payload)=>{
  const res=await api.post("/designation",payload)
  return res
}

export const getDesignation=async()=>{
  const res=await api.get("/designation")
  return res
}

export const deleteDesignation=async(id)=>{
  const res=await api.delete(`/designation/${id}`)
  return res
}


export const updateDesignation=async(id,payload)=>{
  const res=await api.patch(`/designation/${id}`,payload)
  return res
}

export const updateDepartment=async(id,payload)=>{
  const res=await api.patch(`/department/${id}`,payload)
  return res
}

export const deleteDepartment=async(id)=>{
  const res=await api.delete(`/department/${id}`)
  return res.data
}

export const getMessage=async()=>{
  const res=await api.get(`/welcome`)
  return res.data
}

export const updateMessage=async(formData)=>{
  const res=await api.patch(`/welcome`,formData)
  return res.data
}


export default api;
