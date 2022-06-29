import connectDB from "../../../utils/database";
import { InnerScanModel } from "../../../utils/schemaModels";

const getSingleInnerScan = async(req, res) => {
    try {
        await connectDB();
        const singleScan = await InnerScanModel.findById(req.query.id);
        console.log(singleScan);
        return res.status(200).send({message: "体組成計読み取り成功", singleScan: singleScan});
    } catch (error) {
        return res.status(400).send({message: "体組成計読み取り失敗"});
    }
}

export default getSingleInnerScan;