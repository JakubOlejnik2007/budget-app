const {Category} = require("../models");

const getCategories = async (req, res) => {
    try {
        res.send(await Category.find());
    } catch (error){
        console.log(error)
        res.sendStatus(422)
    }
}

module.exports = {
    getCategories,
};