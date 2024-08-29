import { createDocument } from "../../../helpers";
import { AudioMethods, Track } from "../interface";
import config from './config.json'
export class HitmotopService implements AudioMethods {
    async getAudioUrls(prompt: string) {
        const page = await this.fetchPage(prompt)
        const document = createDocument(page)
        const tracks = document.querySelectorAll(config.selectors.tracks);
        const result: Track[] = []
        tracks.forEach(track => {
            const url = track.querySelector<HTMLAnchorElement>(config.selectors.track_link)!.href
            const name = track.querySelector(config.selectors.track_link)?.textContent || ''
            const author = track.querySelector(config.selectors.track_author)?.textContent || ''
            const format = url.split('.').at(-1) || 'mp3';
            result.push({
                url,
                name,
                author,
                format,
            })
        })
        return result;
    }

    private async fetchPage(prompt: string) {
        const url = config.queryUri + prompt.split(' ').join('+')
        return await axios.get<string>(url).then(r => r.data)
    }
}