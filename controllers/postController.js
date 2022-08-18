import PostModal from '../models/post.js'
import UserModal from '../models/user.js'
import mongoose from "mongoose"


export const getAllPosts = async ( req, res) => {
    const posts = await PostModal.find()  
    
    try {
        res.status(200).json(posts)
       

    } catch (err) {
        res.status(404).json({ message: "Something went wrong", error: err });
    }
}


export const getPostsByUser = async ( req, res ) => {
    const { nickname } = req.params;
    const userExists = await UserModal.findOne({nickname})

  if (!userExists) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const userPosts = await PostModal.find({ author: nickname });
  res.status(200).json(userPosts);
}



export const createPost = async ( req, res) => {
    const { title, text, author, image} = req.body
    if (!title | !text | !author | !image) {
        res.status(400)
        throw new Error('Please fill in all post details')
    }
    const post = req.body
    
    const newPost = new PostModal({
        ...post
    })
    try {
        await newPost.save();
        res.status(201).json({newPost})
    } catch (error) {
        res.status(404).json({message: "something went wrong"})
    }
   
}


export const updatePost = async ( req, res) => {
    const {id} = req.params
    try {
    const post = await PostModal.findById(id)
    if(!post) {
        res.status(400)
        throw new Error('Post not found')
    }
       const updatedPost = await PostModal.findByIdAndUpdate(req.params.id, req.body, { new: true})
       res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }  
}


export const deletePost = async ( req, res) => {
    const {id} = req.params
    try {
        const post = await PostModal.findById(id)
        if(!post) {
            res.status(400)
            throw new Error('Post does not exist')
        }
        await PostModal.findByIdAndRemove(id);
        res.json({message: 'Post has been successfullly deleted.'})

    } catch (error) {
        res.status(404).json({message: 'Something went wrong while trying to remove post.'})
    }


    res.status(200).json({message: `Delete post ${req.params.id}`})
}





