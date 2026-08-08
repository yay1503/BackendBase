import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req , res) => {
    // get user details from frontend
    // validation - not empty 
    // check if user already exists: username, email
    // upload them to cloudinary
    // create user object - create entry in db
    // check for user creation
    // return result

    const {fullname,email,username,password} = req.body
    // console.log(email);

    if(
        [fullname,email,username,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError
    }

    const existedUser =User.findOne({
        $or:[{email} ,{username}]
    })
    
    if(existedUser){
        throw new ApiError(409, "Username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath){
        throw new ApiError(400,"Avatar file required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400, "Avatar file required")
    }

    await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username : username.toLower()
    })

    const created = await User.findById(User._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )

}) 

export {registerUser}