const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User, Favorite} = require('../models')

class Controllers {
    static register(req, res){
        const newUser ={
            email: req.body.email,
            password:req.body.password
        }
        User.create(newUser)
        .then(user =>{
            res.status(201).json({
                'id': user.id,
                "email": user.email
            })
        })
        .catch(error =>{
            console.log(error);
            if(error.errors[0].message === "User.password cannot be null" || error.errors[0].message === "User.email cannot be null"){
                res.status(400).json({message: 'Email or Password connot be null'})
            }else if(error.errors[0].message ==="email must be unique"){
                res.status(400).json({
                    message: "Email is already exists"
                })
            }
            else if(error.errors[0].message){
                res.status(400).json({
                    message:error.errors[0].message
                })
            }else{
                res.status(500).json(error)
            }
        })
    }
    static login(req, res){
        const {email, password} = req.body
        User.findOne({where:{email}})
        .then(user =>{
            if(user && bcrypt.compareSync(password, user.password)){
                const access_token = jwt.sign({id:user.id}, process.env.JWT_SECRET)
                res.status(200).json({access_token: access_token})
            }else{
                res.status(401).json({
                    message: "Invalid Email/Password"
                })
            }
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json(error)
        })
    }
    static googleLogin(req, res, next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const {token_google} = req.body
        let email = ""
        client.verifyIdToken({
            idToken: token_google,
            audience:process.env.CLIENT_ID
        })
        .then(ticket =>{
            const payload = ticket.getPayload()
            email = payload.email
            
            return User.findOne({
                where:{email: payload.email}
            })
        })
        .then((user)=>{
            if(!user){
                return User.create({
                    email, password: Math.random()* 100 + "afasde"
                })
            }else{
                const access_token = jwt.sign(
                    {id:user.id, email: user.email}, 
                    process.env.JWT_SECRET
                )
                res.status(200).json({
                    success:true,
                    message:"success signup",
                    access_token
                })
            }
        })
        .catch((err)=>{
            res.status(500).json({error:err})
        })
    }
    static fetchFavorites(req, res){
        Favorite.findAll()
        .then(favorite =>{
            res.status(200).json(favorite)
        })
        .catch(error =>{
            res.status(500).json(error)
        })
    }
    static addFavorites(req, res){
        const userId = req.userId
        const {title, artist, image, file} = req.body
        Favorite.create({userId, title, artist, image, file})
        .then(favorite =>{
            res.status(201).json(favorite)
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json(error)
        })

    }
    static deleteFavorites(req, res){
        Favorite.destroy({where:{id:req.params.id}})
        .then(_ =>{
            res.status(200).json({message: "Success Delete"})
        })
        .catch( error =>{
            res.staus(500).json(error)
        })

    }
}
module.exports = Controllers