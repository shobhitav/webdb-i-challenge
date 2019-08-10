const express= require('express');
const db = require('../data/dbConfig.js');
const router = express.Router();

//(Steps for the project
// 1. yarn install ,yarn add knex sqlite3
//2.Since seeds data is not run before is no data in database.So,
// navigate to node_modules and then .bin file  .
//3. In the bin file do  'yarn knex seed:run'
// do yarn server,data will be visible now wih crud operations)



//  CRUD OPERATIONS

//GET
router.get('/', async(req, res) => {
    try{
        const accounts=await db('accounts');
         // The below line is the same as above, but different syntax like sql code
            // const [accounts]=await db.select('*').from('posts')
        res.status(200).json(accounts)
    }
    catch(err){
        res.status(500).json({message: "Error getting accounts", error:err})
    }
    });

// GET by ID
    router.get('/:id', async(req, res) => {
        const {id}=req.params
         try{
             // syntax more like regular sql code
             const account =await db.select('*') .from('accounts').where({id});
             // const post = await db.select("*").from("posts").where({id: req.params.id});
             if(account){res.status(200).json(account)}
             else{res.status(404).json(` could not find the accounts for ${id}`)}
         }
         catch(err){
             res.status(500).json({message:" failed to get the accounts",err})
         }
     
     });


      //POST
     router.post('/', async(req, res) => {
        const accountData=req.body;
        // console.log(accountData);
        try{
           
        const account= await db('accounts').insert(accountData)
        res.status(201).json(account)
        }
        catch(err){
            res.status(500).json({message: 'couldnt add the new account'});
        }
        });
         

       



// PUT
     router.put('/:id', async(req, res) => {
        const {id}=req.params;
        const updateData=req.body;
        try{
            const count=await db('accounts').where("id", "=", id).update(updateData);
    
            if(count){res.status(200).json({updated:count}) }
            else{res.status(404).json({message:`could not find accounts # ${id}`})  }
           
          
         }
    
         catch(err){
           res.status(500).json({message: 'couldnt add the account',err})
          }
    
    });
    
    // DELETE
    router.delete('/:id', async(req, res) => {
        const {id}=req.params;
       
        try{
            const count=await db('accounts').where("id", "=", id).del();
            res.status(204).json({message: `id ${id} was deleted`}) ;
        }
           
        catch(err){
            res.status(500).json({message: 'couldnt delete the account',err})
           }
        });

module.exports = router;