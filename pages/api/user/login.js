import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

const loginUser = async(req, res) => {
    try {
        await connectDB();
        const findUser = await UserModel.findOne({id: req.body.id});
        if (findUser) {
            // ユーザが存在する場合
            if (req.body.password === findUser.password) {
                return res.status(200).json({message: "ログイン成功"});
            }
            return res.status(400).json({message: "ログイン失敗: パスワードが異なります。"});
        } else {
            // ユーザが存在しない場合
            return res.status(400).json({message: "ログイン失敗: 存在しないIDです。"});
        }
    } catch (error) {
        return res.status(400).json({message: "ログイン失敗"});
    }
}

export default loginUser;