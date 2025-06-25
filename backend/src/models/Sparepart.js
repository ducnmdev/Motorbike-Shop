const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug);

const SparepartSchema = new Schema({
    tenPhuTung: { type: String },
    gia: { type: Number, required: true },
    soLuong: { type: Number, required: true },
    chiTietPhuTung: { type: String },
    imgPhuTung: { type: String },

    slug: { type: String, slug: 'tenPhuTung', unique: true },
});

const Sparepart = mongoose.model('Sparepart', SparepartSchema);
module.exports = Sparepart;