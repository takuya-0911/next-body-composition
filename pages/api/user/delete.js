import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import { UserPersonalModel } from "../../../utils/schemaModels";
import { InnerScanModel } from "../../../utils/schemaModels";
import { LOGIN_KBN } from "../../../constants/constants";

const DeleteUser = async(req, res) => {
    try {
        await connectDB();
        // 独自ユーザの場合
        if (LOGIN_KBN.CREDENTIALS === req.body.login_kbn) {
            // ユーザ情報更新
            await UserModel.deleteOne({email: req.body.email});
        }
        // ユーザ個人情報更新
        await UserPersonalModel.deleteOne({login_kbn: req.body.login_kbn, email: req.body.email});
        // 体組成計情報削除
        await InnerScanModel.deleteMany({login_kbn: req.body.login_kbn, email: req.body.email});
        return res.status(400).json({message: "ユーザ削除成功"});
    } catch (error) {
        return res.status(400).json({message: "ユーザ削除失敗"});
    }
}

export default DeleteUser;