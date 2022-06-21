import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

const RegisterUser = async(req, res) => {
    try {
        await connectDB();
        await UserModel.create(req.body);
        return res.status(200).json({message: "ユーザ登録成功"});
    } catch (error) {
        return res.status(400).json({message: "ユーザ登録失敗"});
    }
}

export default RegisterUser;