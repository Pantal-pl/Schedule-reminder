import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface ILinks  {
      link: string,
      hash: string,
}

 const linkSchema = new Schema<ILinks>({
      link: {type: String, required: true},
      hash: {type: String, required: true},
});

export default mongoose.model<ILinks>("Link", linkSchema);
