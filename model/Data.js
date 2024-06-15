import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    condition: { type: String },
    description: { type: String },
    title: { type: String },
    brand: { type: String },
    price: { type: String },
    product_type: { type: String },
    custom_label_0: { type: String },
    timestamp: { type: Date },
});

const Data = mongoose.model('Data', dataSchema);

export default Data;