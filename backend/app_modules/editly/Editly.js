const editly = require('editly');

module.exports = edit = async function(conf){
    try {
        await editly({
            outPath: "",
            width: 420,
            height: 768,
            fps: 30,
            allowRemoteRequests: false,
            defaults: {
                duration: 4,
                transition: {
                    duration: 0.5,
                    name: 'random',
                    audioOutCurve: 'tri',
                    audioInCurve: 'tri',
                },
                layer: {
                    fontPath: "",
                    // ...more layer defaults
                },
                layerType: {
                    'fill-color': {
                        color: '#ff6666',
                    }
                    // ...more per-layer-type defaults
                },
            },
            clips: [
                {
                    transition: undefined,
                    duration: undefined,
                    layers: [
                        {
                            type: "video",
                            // ...more layer-specific options
                        }
                        // ...more layers
                    ],
                }
                // ...more clips
            ],
            audioFilePath: undefined,
            loopAudio: false,
            keepSourceAudio: false,
            clipsAudioVolume: 1,
            outputVolume: 1,
            audioTracks: [
                {
                    path: "",
                    mixVolume: 1,
                    cutFrom: 0,
                    cutTo: undefined, // number
                    start: 0,
                },
                // ...more audio tracks
            ],
            audioNorm: {
                enable: false,
                gaussSize: 5,
                maxGain: 30,
            },

            // Testing options:
            enableFfmpegLog: false,
            verbose: false,
            fast: false,
        })
    }catch (e) {
        console.log(e);
    }
}