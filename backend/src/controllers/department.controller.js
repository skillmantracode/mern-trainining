import DepartmentModel from "../models/Department.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

//create the department
export const createDepartment = asyncHandler(async (req, res) => {
  const { title, code, description, status } = req.body;
  if (!title || !code || !description ) {
    throw new ApiError(400, "The required field is not avilable");
  }

  //check the code is exist
  const isCodeExist = await DepartmentModel.findOne({
    code: code.toUpperCase(),
  });
  if (isCodeExist) {
    throw new ApiError(400, "The code is already exist");
  }

  const department = await DepartmentModel.create({
    title,
    code: code.trim().toUpperCase(),
    description,
    status,
  });

  return res.status(201).json({
    success: true,
    message: "Department created successfully",
    data: department,
  });
});


export const getDepartment=asyncHandler(async(req,res)=>{
  const department=await DepartmentModel.find()

  if(!department){
    throw new ApiError(400,"The departemnt is not avilable")
  }
    return res.status(201).json({
    success: true,
    message: "Department get successfully",
    data: department,
  });
})


export const deleteDepartment=asyncHandler(async(req,res)=>{
  const id=req.params.id
  const department=await DepartmentModel.findByIdAndDelete(id)
    return res.status(201).json({
    success: true,
    message: "Department delete successfully",
    data: department,
  });
})


export const updateDepartment = asyncHandler(async (req, res) => {
  const id=req.params.id
  const { title, code, description, status } = req.body;
  if (!title || !code || !description) {
    throw new ApiError(400, "The required field is not avilable");
  }

  //check the code is exist
  const isCodeExist = await DepartmentModel.findOne({
    code: code.toUpperCase(),
  });
  if (isCodeExist) {
    throw new ApiError(400, "The code is already exist");
  }

  const department = await DepartmentModel.findByIdAndUpdate(id,{
    title,
    code: code.trim().toUpperCase(),
    description,
    status,
  });

  return res.status(201).json({
    success: true,
    message: "Department created successfully",
    data: department,
  });
});