import asyncHandler from "express-async-handler";
import { addRoleData, getAllRoles, getRoleById, getRoleByName } from "../services/role.service.js";

export const AddRole = asyncHandler(async (req, res) => {
    const result = await addRoleData(req, res);
  });


  export const GetbyRoleName = asyncHandler(async (req, res) => {
    const result = await getRoleByName(req, res);
  });

  export const GetAllRoleData = asyncHandler(async (req, res) => {
    const result = await getAllRoles(req, res);
  });

  export const GetByIdData = asyncHandler(async (req, res) => {
    const result = await getRoleById(req, res);
  });