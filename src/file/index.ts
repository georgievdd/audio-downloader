import { Track } from "../audio/services/interface"
import axios from "axios"
import fs from "fs"
import path  from "path"
export class FileService {
    private dir: string
    
    constructor(dir: string) {
        this.dir = dir
    }
    
    async downloadTrack(track: Track, additionalDir?: string) {
        const fileName = this.getFileName(track)
        if (additionalDir) {
            try {
                FileService.createDir(path.join(this.dir, additionalDir))
            } catch (err) {
                // already exist
            }
        }
        const filePath = path.join(this.dir, additionalDir || '', fileName)
        const writer = fs.createWriteStream(filePath)
        return new Promise((resolve, reject) => {
            axios.get(track.url, { responseType: 'stream' })
                .then(response => {
                if (response.status !== 200) {
                    console.error(response.status, "Error downloading file")
                    reject()
                    return
                }
                const file = response.data as any
                let error: Error | null = null
                file.pipe(writer)
                writer.on('error', err => {
                    error = err
                    writer.close()
                    reject(err)
                })
                writer.on('close', () => {
                    if (!error) {
                        resolve(filePath)
                    }
                })
            })
        })
    }

    clearStr(str: string) {
        return str.replace('\n', '').trim()
    }
    getFileName(track: Track) {
        const name = `${this.clearStr(track.name)} - ${this.clearStr(track.author)}.${this.clearStr(track.format)}`
        return name.replace(/[/\\?%*:|"<>]/g, '') //isValidFileName(name) ? name : `t${name}`
    }
    static createDir(url: string) {
        fs.mkdirSync(url)
    }
}