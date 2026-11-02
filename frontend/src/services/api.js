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

/**
 * Fetch all achievements
 */
export const getAchievements = async () => {
  try {
    const response = await api.get('/achievement');
    return response.data; // Extract data directly from Axios response
  } catch (error) {
    console.error('Failed to fetch achievements:', error);
    throw error; // Re-throw so the caller can handle the error state
  }
};

// /**
//  * Create a new achievement
//  * @param {Object} achievementData - The payload for the new achievement
//  */
export const createAchievements = async (achievementData) => {
  try {
    const response = await api.post('/achievement', achievementData);
    return response.data;
  } catch (error) {
    console.error('Failed to create achievement:', error);
    throw error;
  }
};

// /**
//  * Update achievements
//  * @param {Object} achievementData - The updated achievement data
//  */
export const updateAchievements = async (achievementData) => {
  try {
    const response = await api.put('/achievement', achievementData);
    return response.data;
  } catch (error) {
    console.error('Failed to update achievements:', error);
    throw error;
  }
};

export const getFooter = async () => {
  const res = await api.get("/footer");
  return res.data;
};

// Create Footer
export const createFooter = async (data) => {
  const res = await api.post("/footer", data);
  return res.data;
};

// Update Footer
export const updateFooter = async (data) => {
  const res = await api.put("/footer", data);
  return res.data;
};


// Get all hero slides
export const getAllHeroSlides = async () => {
  const res = await api.get("/hero");
  return res.data;
};

// Get a single hero slide
export const getHeroSlideById = async (id) => {
  const res = await api.get(`/hero/${id}`);
  return res.data;
};

// Create hero slide
export const createHeroSlide = async (data) => {
  const res = await api.post("/hero", data);
  return res.data;
};

// Update hero slide
export const updateHeroSlide = async (id, data) => {
  const res = await api.put(`/hero/${id}`, data);
  return res.data;
};

// Delete hero slide
export const deleteHeroSlide = async (id) => {
  const res = await api.delete(`/hero/${id}`);
  return res.data;
};


// CREATE EVENT
export const createEvent = (data) => {
  return api.post("/event", data);
};

// GET ALL EVENTS
export const getEvents = () => {
  return api.get("/event");
};

// GET EVENT BY ID
export const getEventById = (id) => {
  return api.get(`/event/${id}`);
};

// UPDATE EVENT
export const updateEvent = (id, data) => {
  return api.put(`/event/${id}`, data);
};

// DELETE EVENT
export const deleteEvent = (id) => {
  return api.delete(`/event/${id}`);
};



// GET all notices
export const getNotices = async () => {
  const res = await api.get("/notices");
  return res.data;
};

// GET a single notice by ID
export const getNoticeById = async (id) => {
  const res = await api.get(`/notices/${id}`);
  return res.data;
};

// CREATE notice
export const createNotice = async (formData) => {
  const res = await api.post("/notices", formData);
  return res.data;
};

// UPDATE notice
export const updateNotice = async (id, formData) => {
  const res = await api.patch(`/notices/${id}`, formData);
  return res.data;
};

// DELETE notice
export const deleteNotice = async (id) => {
  const res = await api.delete(`/notices/${id}`);
  return res.data;
};



// CREATE SYLLABUS
export const createSyllabus = async (formData) => {
  const { data } = await api.post("/syllabus", formData);
  return data;
};

// GET ALL SYLLABUS
export const getSyllabus = async (params = {}) => {
  const { data } = await api.get("/syllabus", {
    params,
  });

  return data;
};

// GET SYLLABUS BY ID
export const getSyllabusById = async (id) => {
  const { data } = await api.get(`/syllabus/${id}`);
  return data;
};

// UPDATE SYLLABUS
export const updateSyllabus = async (id, formData) => {
  const { data } = await api.patch(
    `/syllabus/${id}`,
    formData
  );

  return data;
};

// DELETE SYLLABUS
export const deleteSyllabus = async (id) => {
  const { data } = await api.delete(`/syllabus/${id}`);
  return data;
};




// ======================================
// GALLERY CRUD
// ======================================

// CREATE GALLERY
export const createGallery = async (formData) => {
  const res = await api.post("/gallery", formData);
  return res.data;
};

// GET ALL GALLERY
export const getGalleries = async () => {
  const res = await api.get("/gallery");
  return res.data;
};

// GET GALLERY BY ID
export const getGalleryById = async (id) => {
  const res = await api.get(`/gallery/${id}`);
  return res.data;
};

// UPDATE GALLERY
export const updateGallery = async (id, formData) => {
  const res = await api.patch(`/gallery/${id}`, formData);
  return res.data;
};

// DELETE GALLERY
export const deleteGallery = async (id) => {
  const res = await api.delete(`/gallery/${id}`);
  return res.data;
};

// ======================================
// GALLERY CATEGORY CRUD
// ======================================

// CREATE CATEGORY
export const createGalleryCategory = async (name) => {
  const res = await api.post("/gallery/categories", {
    name,
  });

  return res.data;
};

// GET ALL CATEGORIES
export const getGalleryCategories = async () => {
  const res = await api.get("/gallery/categories/all");
  return res.data;
};

// DELETE CATEGORY
export const deleteGalleryCategory = async (id) => {
  const res = await api.delete(`/gallery/categories/${id}`);
  return res.data;
};



// CREATE PROGRAM
export const createProgram = async (formData) => {
  const { data } = await api.post("/programs", formData);
  return data;
};

// GET ALL PROGRAMS
export const getPrograms = async () => {
  const { data } = await api.get("/programs");
  return data;
};

// GET PROGRAM BY ID
export const getProgramById = async (id) => {
  const { data } = await api.get(`/programs/${id}`);
  return data;
};

// UPDATE PROGRAM
export const updateProgram = async (id, formData) => {
  const { data } = await api.patch(
    `/programs/${id}`,
    formData
  );

  return data;
};

// DELETE PROGRAM
export const deleteProgram = async (id) => {
  const { data } = await api.delete(`/programs/${id}`);
  return data;
};



export default api;
