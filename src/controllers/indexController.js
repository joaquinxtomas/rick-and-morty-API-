const path = require ('path');
const axios = require('axios')
const fetch = require('node-fetch')

indexController = {
    index: (req,res)=>{
            return res.render('index')
    }

}

module.exports = indexController;