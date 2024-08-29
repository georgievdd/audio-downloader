import { FileService } from "../file";
import { formatDate } from "../helpers";
import path from 'path'
export class Session extends FileService {


    constructor(uploadsRoot: string = '.') {
        try {
            FileService.createDir(uploadsRoot)
        } catch {
            // already exists
        }
        const time = formatDate(new Date())
        const dirPath = path.join(uploadsRoot, time)
        FileService.createDir(dirPath)
        super(dirPath)
    }
}