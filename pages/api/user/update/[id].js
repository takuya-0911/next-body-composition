import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import { UserPersonalModel } from "../../../../utils/schemaModels";

const loginUser = async(req, res) => {
    try {
        await connectDB();
        const findUser = await UserModel.findOne({email: req.query.email});
        const findUserPersonal = await UserPersonalModel.findOne({email: req.query.email});
        await findUser.updateOne({email: req.query.email}, req.body);
        await findUserPersonal.updateOne({email: req.query.email}, req.body);
        return res.status(400).json({message: "ユーザ編集成功"});
    } catch (error) {
        return res.status(400).json({message: "ユーザ編集失敗"});
    }
}

export default loginUser;