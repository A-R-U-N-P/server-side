import * as mongoose from 'mongoose';
import { logger } from '../shared/helper/logger';

const uri = 'mongodb://localhost:27017/organization_management_db';

export const connectToDatabase = async () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(uri).then((res) => {
            logger.log("MONGO DB CONNETED !");
            resolve(true);
        }).catch((error) => {
            reject(error);
        });
    });
};
