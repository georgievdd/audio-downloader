import { Session } from "./session";
import { HitmotopService } from "./audio/services/hitmotop";
import { Timer } from "./helpers";
async function main(prompts: string[], additionalDownload: number = 0) {
    const session = new Session()
    const hitmotop = new HitmotopService()
    const timer = new Timer();
    const loadService = new HitmotopService();
    await Promise.allSettled(prompts.map(prompt => new Promise(async (resolve, reject) => {
        const tracks = await loadService.getAudioUrls(prompt);
        const track = tracks.shift();
        if (!track) {
            return reject(new Error("No audio"));
        }
        const path = await session.downloadTrack(track);
        const adPaths = tracks?.slice(0, additionalDownload).map((track, i) => {
            return session.downloadTrack(track, prompt)
        });
        console.log(`${prompt}: downloaded in ${path}`);
        adPaths.forEach(async (adPath) =>  {
            console.log(`${prompt}: downloaded in ${await adPath}`);
        })
        resolve(path);
    })))
    console.log(`downloaded at ${timer.end()} seconds`);
}

main([
    "золотая осень",
    "Россия Газман",
    "Пришествие",
    "Голубая Луна",
    "HELP Beatles",
    "Шум дождя",
    "17 мгновений весны"
]);