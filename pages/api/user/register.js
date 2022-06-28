import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import { UserPersonalModel } from "../../../utils/schemaModels";
import { LOGIN_KBN } from "../../../constants/constants";
import bcrypt from 'bcrypt';

const RegisterUser = async(req, res) => {
    try {
        await connectDB();
        console.log(req);
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPass;
        req.body.login_kbn = LOGIN_KBN.CREDENTIALS;
        await UserModel.create(req.body);
        await UserPersonalModel.create(req.body);
        console.log(req.body);
        return res.status(200).json({message: "ユーザ登録成功"});
    } catch (error) {
        return res.status(400).json({message: "ユーザ登録失敗"});
    }
}

export default RegisterUser;