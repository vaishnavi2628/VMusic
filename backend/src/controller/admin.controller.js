import cloudinary from "../lib/cloudinary";
import { Album } from "../models/album.model";
import { Song } from "../models/song.model";

const uploadToCloudinary=async(file)=>{
    try {
        const result=await cloudinary.uploader.upload(file.tempFilePath,
            {
                resource_type:"auto",
            }

        )
        return result.secure_url
    } catch (error) {
        console.log("Error in uploadCloudinary",error);
        throw new Error(error);  
    }
}

export const createSong= async(req,res,next)=>{
try {
    if(!req.files || !req.files.audioFile ||!req.files.imageFile){
     return res.status(400).json({
        message:"Please upload all files"
     })

    }

    const {title,artist,albumId,duration}= req.body;
    const audioFile=req.files.audioFile
    const imageFile=req.files.imageFile
    
    //in cloudinary
    const audioUrl=await uploadToCloudinary(audioFile);
    const imageUrl=await uploadToCloudinary(imageFile);




    const song=new Song({
        title,
        artist,
        audioUrl,
        imageUrl,
        duration,
        albumId:albumId||null
    })
    
    await song.save();
    //adding song in album
    if(albumId){
        await Album.findByIdAndUpdate(albumId,
           {
            $push:{songs:song._id},
           }
        )
    }
    res.status(200).json(song);

} catch (error) {
    console.log("Error in createSong",error);
    res.status(500).json({
        message:"Internal server error",error
    });
    next(error);
}
}
 
export const deleteSong=async(req,res,next)=>{
    try {
        const {id}=req.params
        const song= await Song.findById(id);
      if(song.albumId){
        await Album.findByIdAndUpdate(song.albumId,{
            $pull:{
                song:song._id
            }
        })
      }
      await Song.findByIdAndDelete(id); 
     res.status(200).json({
        message:"Song deleted successfully"
     });

    } catch (error) {
        console.log("Error in deleteSong",error); 
        next(error);
    }
}
