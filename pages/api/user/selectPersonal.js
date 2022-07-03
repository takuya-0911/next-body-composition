import connectDB from "../../../utils/database";
import { UserPersonalModel } from "../../../utils/schemaModels";
import bcrypt from 'bcrypt';

const SelectUser = async(req, res) => {
    try {
        await connectDB();
        // ユーザ個人情報取得
        const userPersonal = await UserPersonalModel.findOne({login_kbn: req.body.login_kbn, email: req.body.email});
        return res.status(400).json({message: "ユーザ取得成功", userPersonal: userPersonal});
    } catch (error) {
        return res.status(400).json({message: "ユーザ取得失敗"});
    }
}

export default SelectUser;