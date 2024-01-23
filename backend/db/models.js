const mongoose = require('mongoose');

const UserSchema = require('./schemas/UserSchema');
const UserModel = mongoose.model('User', UserSchema);

const BrandSchema = require('./schemas/brand/BrandSchema');
const BrandModel = mongoose.model('Brand', BrandSchema);

const BrandMediaSchema = require('./schemas/brand/BrandMediaSchema');
const BrandMediaModel = mongoose.model('BrandMedia', BrandMediaSchema);

const LinkedAccountSchema = require('./schemas/LinkedAccountSchema');
const LinkedAccountModel = mongoose.model('LinkedAccount', LinkedAccountSchema);


module.exports = {
    User: UserModel,
    Brand: BrandModel,
    BrandMedia: BrandMediaModel,
    LinkedAccount: LinkedAccountModel,
};