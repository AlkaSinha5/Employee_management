import asyncHandler from 'express-async-handler';
import LocationS from "../modles/correntLocation.js"
import User from "../modles/userSchema.js"

export const addLocationData = asyncHandler(async (req, res) => {
    try {
       
         const { UserID,Location,Date,Time,Address} =  req.body;
         const user = await User.findOne({ _id: UserID  });
         
         if (!user) {
           return res.status(404).json({
             success: false,
             error: 'User not found',
           });
         }

  const location= await LocationS.create({
            UserID,Location,Date,Time,Address
        });

        user.locations.push(location._id);
        await user.save();

        res.status(201).json({
            success: true,
            data: location,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});






export const getAllLocation = asyncHandler(async (req, res) => {
    try {
        const location = await LocationS.find();

        res.status(200).json({
            success: true,
            data: location,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
});

export const getLocationeById = asyncHandler(async (id) => {
    const success = await LocationS.findById(id);
    // console.log(success);
    return success;
  });


  export const deleteLocation = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const success = await LocationS.findByIdAndDelete(id);
    if (success) {
      res.status(200).send({ success, message: "Ok deleted ......" });
    } else {
    
      res.status(404).send({massage: "ID not found "})
        return { error: "not deleted..." };
    }
  });