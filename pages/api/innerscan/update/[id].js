import connectDB from "../../../../utils/database";
import { InnerScanModel } from "../../../../utils/schemaModels";

const updateInnerScan = async(req, res) => {
    try {
        await connectDB();
        await InnerScanModel.updateOne({_id: req.query.id}, req.body);
        return res.status(200).send({message: "体組成計編集成功"});
    } catch (error) {
        return res.status(400).send({message: "体組成計編集失敗"});
    }
}

export default updateInnerScan