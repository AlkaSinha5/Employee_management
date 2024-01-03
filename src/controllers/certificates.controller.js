import asyncHandler from "express-async-handler";
import { addCertificates, getAllCertificates } from "../services/certificates.services.js";



export const AddCertificates = asyncHandler(async (req, res) => {
    const result = await addCertificates(req, res);
  });

  export const GetCertificates = asyncHandler(async (req, res) => {
    const result = await getAllCertificates(req, res);
  });