import connectDB from "../../../utils/database";
import { InnerScanModel } from "../../../utils/schemaModels";

const getPeriodInnerScan = async(req, res) => {
    try {
        await connectDB();
        const reqDate = await new Date(req.body.bigiMonth);
        const maxDate = await new Date(new Date(reqDate.getFullYear(), reqDate.getMonth() + 1, reqDate.getDate()).setDate(0));
        const monthScan = await InnerScanModel.find({login_kbn: req.body.login_kbn, email: req.body.email, scandate: {$gte: reqDate, $lt: maxDate}});
        return res.status(200).send({message: "1ヶ月分体組成計読み取り成功", monthScan: monthScan});
    } catch (error) {
        return res.status(400).send({message: "1ヶ月分体組成計読み取り失敗"});
    }
}

export default getPeriodInnerScan;