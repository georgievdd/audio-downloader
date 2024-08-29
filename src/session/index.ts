import { FileService } from "../file";
import { formatDate } from "../helpers";
import path from 'path'
export class Session extends FileService {

    static uploadsRoot = 'downloads'

    constructor() {
        const time = formatDate(new Date())
        const dirPath = path.join(Session.uploadsRoot, time);
        FileService.createDir(dirPath);
        super(dirPath);
    }
}