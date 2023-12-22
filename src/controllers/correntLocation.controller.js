import asyncHandler from "express-async-handler";
import { addLocationData } from "../services/correntLocation.services.js";


export const AddLocation = asyncHandler(async (req, res) => {
    const result = await addLocationData(req, res);
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