const { Brand, BrandKey } = require('../../db/models');
const { generateApiKey } = require('generate-api-key');
const create = async function(payload){
    try{

        const newBrand = new Brand(payload);

        const newBrandKey = {
            name: newBrand.name + '_brand_key',
            user_id: payload.user_id,
            brand_id: newBrand._id,
            key: generateApiKey({
                method: 'base32',
                length: 16,
                prefix: 'brand_' + newBrand.name
            })
        }

        newBrand.keys.push(newBrandKey);
        const savedBrand = await newBrand.save();

        console.log(savedBrand);
        return savedBrand;
    }catch (e) {
        console.log(e);
    }
}

const update = async function(payload){
    try{
        const updatedBrand = Brand.findOneAndUpdate({_id: payload._id}, payload);
        console.log(updatedBrand);
        return updatedBrand;
    }catch (e) {
        console.log(e);
    }
}

const del = async function(brand_id){
    try{
        const deletedBrand = await Brand.findOneAndDelete({_id: brand_id});
        console.log(deletedBrand);
        return deletedBrand;
    }catch (e) {
        console.log(e);
    }
}


module.exports = {
    create,
    update,
    delete: del,
}