import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import { UserPersonalModel } from "../../../utils/schemaModels";
import { LOGIN_KBN } from "../../../constants/constants";
import bcrypt from 'bcrypt';

const UpdateUser = async(req, res) => {
    try {
        await connectDB();
        // 独自ユーザ情報編集の場合
        if (LOGIN_KBN.CREDENTIALS === req.body.login_kbn && !!req.body.currentPassword && !!req.body.newPassword) {
            // パスワード比較
            const foundUser = await UserModel.findOne({login_kb: req.body.login_kbn, email: req.body.email});
            const result = await bcrypt.compare(req.body.currentPassword, foundUser.password);
            
            if (result) {
                // パスワード暗号化
                console.log(req.body.newPassword);
                const hashedPass = await bcrypt.hash(req.body.newPassword, 10);
                console.log(hashedPass);
                req.body.password = hashedPass;
                console.log(req.body);
                // ユーザ情報更新
                await UserModel.updateOne({email: req.body.email}, req.body);
            } else {
                return res.status(400).json({message: "パスワードが異なります。"});
            }

        } else if (LOGIN_KBN.CREDENTIALS === req.body.login_kbn && !!req.body.currentPassword) {
            return res.status(400).json({message: "変更後パスワードが入力されていません。"});
        }
        
        // ユーザ個人情報更新
        await UserPersonalModel.updateOne({login_kbn: req.body.login_kbn, email: req.body.email}, req.body, {upsert:true});
        return res.status(200).json({message: "ユーザ編集成功"});
    } catch (error) {
        return res.status(400).json({message: "ユーザ編集失敗"});
    }
}

export default UpdateUser;