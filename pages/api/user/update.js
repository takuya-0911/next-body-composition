import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import { UserPersonalModel } from "../../../utils/schemaModels";
import { LOGIN_KBN } from "../../../constants/constants";

const UpdateUser = async(req, res) => {
    try {
        await connectDB();
        // 独自ユーザの場合
        if (LOGIN_KBN.CREDENTIALS === req.body.login_kbn) {
            // ユーザ情報更新
            await UserModel.updateOne({email: req.body.email}, req.body);
        }
        // ユーザ個人情報更新
        await UserPersonalModel.updateOne({login_kbn: req.body.login_kbn, email: req.body.email}, req.body);
        return res.status(400).json({message: "ユーザ編集成功"});
    } catch (error) {
        return res.status(400).json({message: "ユーザ編集失敗"});
    }
}

export default UpdateUser;