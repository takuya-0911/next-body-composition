import connectDB from "../../../../utils/database";
import { InnerScanModel } from "../../../../utils/schemaModels";

const deleteInnerScan = async(req, res) => {
    try {
        await connectDB();
        await InnerScanModel.deleteOne({_id: req.query.id});
        return res.status(200).send({message: "体組成計削除成功"});
    } catch (error) {
        return res.status(400).send({message: "体組成計削除失敗"});
    }
}

export default deleteInnerScan;