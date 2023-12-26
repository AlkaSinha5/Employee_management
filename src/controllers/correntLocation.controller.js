import asyncHandler from "express-async-handler";
import { addLocationData, deleteLocation, getAllLocation, getLocationeById } from "../services/correntLocation.services.js";


export const AddLocation = asyncHandler(async (req, res) => {
    const result = await addLocationData(req, res);
  });


  export const GetLocationById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await getLocationeById(id);
    res.status(200).send({ result });
  });

  export const GetAllLocationData = asyncHandler(async (req, res) => {
    const result = await getAllLocation(req, res);
  });

  export const DeleteLocation = asyncHandler(async (req, res) => {
    const result = await deleteLocation(req, res);
  });

  