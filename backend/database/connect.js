import mongoose, {Schema} from "mongoose";
export async function initDB() {
    return await mongoose.connect(`mongodb+srv://${process.env.MONGONAME}:${process.env.MONGOPASS}@deezy.h4iz7tb.mongodb.net/?retryWrites=true&w=majority`);

    // const MyModel = mongoose.model('Users', new Schema({ name: String, id: String }));
    // const doc = new MyModel();
    // doc.name = "Jean";
    // doc.id = '123-da3dsda21d';
    // doc.save();
    // console.log(doc);

    // setTimeout(() => {
    //     let name = 'Jean';
    //     MyModel.findOne({name: new RegExp('^' + name + '$', 'i')}).then((err, doc) => {
    //         console.log(err);
    //     })
    // }, 3000);

}

const userSchema = new Schema({
    id: String,
    displayName: String,
    email: String,
    token: String,
});

export const UserModel= mongoose.model("Users", userSchema);
