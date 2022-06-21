import connectDB from "../../../utils/database";
import { InnerScanModel } from "../../../utils/schemaModels";

const getMonthInnerScan = async(req, res) => {
    try {
        await connectDB();
        const reqdate = await new Date(req.body.scanDate);
        const maxdate = await new Date(reqdate.getFullYear() + "-" + (reqdate.getMonth() + 2) + "-01");
        const monthScan = await InnerScanModel.find({ScanDate: {$gte: reqdate, $lt: maxdate}});
        return res.status(200).send({message: "1ヶ月分体組成計読み取り成功", monthScan: monthScan});
    } catch (error) {
        return res.status(400).send({message: "1ヶ月分体組成計読み取り失敗"});
    }
}

export default getMonthInnerScan;