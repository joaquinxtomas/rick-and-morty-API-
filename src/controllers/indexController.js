const path = require ('path');
const axios = require('axios')
const fetch = require('node-fetch')

indexController = {
    index: (req,res)=>{
            return res.render('index')
    },
    /* search: async (req,res)=>{ */
/*         try {
            const result = req.body.search
            const resultados= result.replace(' ', '%20')
            console.log(resultados)

            const character = await fetch(`https://rickandmortyapi.com/api/character/?name=${resultados}`)
            const response = await character.json() 

            console.log(response)
            res.render('index',{response})
        } catch (error) {
            console.log(error)
        } */
    /* } */

}

module.exports = indexController;