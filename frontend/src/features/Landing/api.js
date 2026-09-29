import api from "../../services/api";

// --- UPPER PART API ---
export const getUpperAbout = async () => {
  try {
    const response = await api.get("/about/upper");
    return response.data;
  } catch (err) {
    console.error("Error fetching upper section:", err.message);
    throw err;
  }
};

export const updateUpperAbout = async (payload) => {
  try {
    const response = await api.patch("/about/upper", payload);
    return response.data;
  } catch (err) {
    console.error("Error updating upper section:", err.message);
    throw err;
  }
};

// --- MIDDLE PART API (Handles FormData for file upload) ---
export const getMiddleAbout = async () => {
  try {
    const response = await api.get("/about/middle");
    return response.data;
  } catch (err) {
    console.error("Error fetching middle section:", err.message);
    throw err;
  }
};

export const updateMiddleAbout = async (formData) => {
  try {
    const response = await api.patch("/about/middle", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error updating middle section:", err.message);
    throw err;
  }
};

// --- LOWER PART API ---
export const getLowAboutPart = async () => {
  try {
    const response = await api.get("/about/lower");
    return response.data;
  } catch (err) {
    console.error("Error fetching lower section:", err.message);
    throw err;
  }
};

export const updateLowAboutPart = async (payload) => {
  try {
    const response = await api.patch("/about/lower", payload);
    return response.data;
  } catch (err) {
    console.error("Error updating lower section:", err.message);
    throw err;
  }
};