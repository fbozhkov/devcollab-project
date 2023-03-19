import * as cloudinary from 'cloudinary'
import * as dotenv from 'dotenv'
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
console.log('cloudinary config:')
console.log(cloudinary.config())

export default cloudinary