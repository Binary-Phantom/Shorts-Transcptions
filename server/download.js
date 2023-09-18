import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => {
  const videoURL = "https://youtube.com/shorts/" + videoId
  console.log("realizando o download do vídeo", videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxdurationMs / 1000
      if (seconds > 60) {
        throw new Error("Duração inválida")
      }
      //console.log(seconds)
      //console.log(info)
    })
    .on("end", () => {
      console.log("Download finalizado.")
    })
    .on("error", (error) => {
      console.log("Não foi possível realizar o download. Detalhes:", error)
    }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
}
