import connectDB from "../../../utils/database";
import { InnerScanModel } from "../../../utils/schemaModels";

const RegisterInnerScan = async(req, res) => {
    try {
        await connectDB();
        console.log(req.body);
        await InnerScanModel.create(req.body);
        return res.status(200).json({message: "体組成計データ登録成功"});
    } catch (error) {
        return res.status(400).json({message: "体組成計データ登録失敗"});
    }
}

export default RegisterInnerScan;