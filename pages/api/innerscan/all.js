import connectDB from "../../../utils/database";
import { InnerScanModel } from "../../../utils/schemaModels";

const GetAllInnerScan = async(req, res) => {
    try {
        await connectDB();
        console.log(process.env);
        const monthScan = await InnerScanModel.find({login_kbn: req.body.login_kbn, email: req.body.email});
        return res.status(200).send({message: "全ての体組成計読み取り成功", monthScan: monthScan});
    } catch (error) {
        return res.status(400).send({message: "全ての体組成計読み取り失敗"});
    }
}

export default GetAllInnerScan;