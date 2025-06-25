const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug);

const AccessorySchema = new Schema({
    tenPhuKien: { type: String },
    tinhNang: { type: String },
    gia: { type: Number, required: true },
    soLuong: { type: Number, required: true },
    sanXuatBoi: { type: String },
    imgPhuKien: { type: String },

    slug: { type: String, slug: 'tenPhuKien', unique: true },
});

const Accessory = mongoose.model('Accessory', AccessorySchema);
module.exports = Accessory;