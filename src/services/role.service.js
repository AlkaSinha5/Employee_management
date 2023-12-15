import asyncHandler from 'express-async-handler';
import roleSchema from '../modles/roleSchema.js';

export const addRoleData = asyncHandler(async (req, res) => {
    try {
        const roleData = req.body;
         const {roleName,isEnabled } = roleData;

        await roleSchema.create({
            roleName,isEnabled,
        });

        res.status(201).json({
            success: true,
            data: roleData,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});


export const getRoleByName = asyncHandler(async (req, res) => {
    const { roleName } = req.params;

    try {
        const role = await roleSchema.findOne({ roleName });

        if (!role) {
            return res.status(404).json({
                success: false,
                error: 'Role not found',
            });
        }

        res.status(200).json({
            success: true,
            data: role,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
});




export const getAllRoles = asyncHandler(async (req, res) => {
    try {
        const roles = await roleSchema.find();

        res.status(200).json({
            success: true,
            data: roles,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
});

export const getRoleById = asyncHandler(async (req, res) => {
    const roleId = req.params.id; 

    try {
        const role = await roleSchema.findById(roleId);

        if (!role) {
            return res.status(404).json({
                success: false,
                error: 'Role not found',
            });
        }

        res.status(200).json({
            success: true,
            data: role,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
});
