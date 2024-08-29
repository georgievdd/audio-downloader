export interface Track {
    url: string
    name: string
    author: string
    format: string
}

export interface AudioMethods {
    getAudioUrls(prompt: string): Promise<Track[]>
}