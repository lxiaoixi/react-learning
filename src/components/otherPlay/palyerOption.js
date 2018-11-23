import swal from "sweetalert";

const options = {
    //audio lists model
    audioLists: [{
            name: "告白气球",
            singer: "周杰伦",
            cover: "http://singerimg.kugou.com/uploadpic/softhead/400/20180515/20180515002522714.jpg",
            musicSrc: "http://fs.w.kugou.com/201811121543/7b4d2f82d2877cb79c689ffc23ba6783/G063/M03/06/11/34YBAFdskzmAUMlOADSMOxgm3l4714.mp3"
        },
        {
            name: "稻香",
            singer: "周杰伦",
            cover: "http://imge.kugou.com/stdmusic/20160929/20160929135846756021.jpg",
            musicSrc: "http://fs.w.kugou.com/201811121550/88dc40d27aa7f2002f022724523ea7bd/G001/M0B/12/19/QQ0DAFS43jOATIosADaWAFwMkd8070.mp3"
        },
        {
            name: "Always Online",
            singer: "林俊杰",
            cover: "http://fs.w.kugou.com/201811121547/ab372de951762a4a7c2a13b93b1048db/G002/M06/05/09/Qg0DAFS5IV-AO15MADb1rDRu3wE800.mp3",
            musicSrc: "https://www.lijinke.cn/music/201711081.mp3"
        }
    ],

    //default play index of the audio player  [type `number` default `0`]
    defaultPlayIndex: 0,

    //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
    theme: "dark",

    // Specifies movement boundaries. Accepted values:
    // - `parent` restricts movement within the node's offsetParent
    //    (nearest node with position relative or absolute), or
    // - a selector, restricts movement within the targeted node
    // - An object with `left, top, right, and bottom` properties.
    //   These indicate how far in each direction the draggable
    //   can be moved.
    bounds: "body",

    //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
    //"auto|metadata|none" "true| false"
    preload: false,

    //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
    glassBg: false,

    //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
    remember: false,

    //The Audio Can be deleted  [type `Boolean`, default `true`]
    remove: true,

    //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
    defaultPosition: {
        top: 300,
        left: 120
    },

    // play mode text config of the audio player
    playModeText: {
        order: "顺序播放",
        orderLoop: "列表循环",
        singleLoop: "单曲循环",
        shufflePlay: "随机播放"
    },

    //audio controller open text  [ type `String | ReactNode` default 'open']
    openText: "打开",

    //audio controller close text  [ type `String | ReactNode` default 'close']
    closeText: "关闭",

    //audio theme switch checkedText  [ type `String | ReactNode` default '-']
    checkedText: "开",

    //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
    unCheckedText: "关",

    // audio list panel show text of the playlist has no songs [ type `String` | ReactNode  default 'no music']
    notContentText: "暂无音乐",

    panelTitle: "播放列表",

    defaultPlayMode: "order",

    //audio mode        mini | full          [type `String`  default `mini`]
    mode: "full",

    /**
     * [ type `Boolean` default 'false' ]
     * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
     */
    once: true,

    //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
    autoPlay: true,

    //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
    toggleMode: true,

    //audio cover is show of the "mini" mode [type `Boolean` default 'true']
    showMiniModeCover: true,

    //audio playing progress is show of the "mini"  mode
    showMiniProcessBar: false,

    //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
    drag: true,

    //drag the audio progress bar [type `Boolean` default `true`]
    seeked: true,

    //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
    // controllerTitle: < FaHeadphones / > ,

    //Displays the audio load progress bar.  [type `Boolean` default `true`]
    showProgressLoadBar: true,

    //play button display of the audio player panel   [type `Boolean` default `true`]
    showPlay: true,

    //reload button display of the audio player panel   [type `Boolean` default `true`]
    showReload: true,

    //download button display of the audio player panel   [type `Boolean` default `true`]
    showDownload: true,

    //loop button display of the audio player panel   [type `Boolean` default `true`]
    showPlayMode: true,

    //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
    showThemeSwitch: true,

    //Extensible custom content       [type 'Array' default '[]' ]
    extendsContent: [],

    //default volume of the audio player [type `Number` default `100` range `0-100`]
    defaultVolume: 100,

    //playModeText show time [type `Number(ms)` default `700`]
    playModeShowTime: 600,

    //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
    loadAudioErrorPlayNext: true,

    //Music is downloaded handle
    onAudioDownload(audioInfo) {
        //swal("download successfully", "", "success");
        console.log("audio download", audioInfo);
    },

    //audio play handle
    onAudioPlay(audioInfo) {
        console.log("audio playing", audioInfo);
    },

    //audio pause handle
    onAudioPause(audioInfo) {
        console.log("audio pause", audioInfo);
    },

    //When the user has moved/jumped to a new location in audio
    onAudioSeeked(audioInfo) {
        console.log("audio seeked", audioInfo);
    },

    //When the volume has changed  min = 0.0  max = 1.0
    onAudioVolumeChange(currentVolume) {
        console.log("audio volume change", currentVolume);
    },

    //The single song is ended handle
    onAudioEnded(audioInfo) {
        swal("Audio is ended!", "", "success");
        console.log("audio ended", audioInfo);
    },

    //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
    onAudioAbort(e) {
        console.log("audio abort", e);
    },

    //audio play progress handle
    onAudioProgress(audioInfo) {
        // console.log('audio progress',audioInfo);
    },

    //audio reload handle
    onAudioReload(audioInfo) {
        console.log("audio reload:", audioInfo);
    },

    //audio load failed error handle
    onAudioLoadError(e) {
        swal("audio load error", "", "error");
        console.log("audio load err", e);
    },

    //theme change handle
    onThemeChange(theme) {
        console.log("theme change:", theme);
    },

    onAudioListsChange(currentPlayIndex, audioLists, audioInfo) {
        console.log("audio lists change:", currentPlayIndex);
        console.log("audio lists change:", audioLists);
        console.log("audio lists change:", audioInfo);
    },

    onAudioPlayTrackChange(currentPlayIndex, audioLists, audioInfo) {
        console.log(
            "audio play track change:",
            currentPlayIndex,
            audioLists,
            audioInfo
        );
    },

    onPlayModeChange(playMode) {
        console.log("play mode change:", playMode);
    },

    onModeChange(mode) {
        console.log("mode change:", mode);
    },

    onAudioListsPanelChange(panelVisible) {
        console.log("audio lists panel visible:", panelVisible);
    },

    onAudioListsDragEnd(fromIndex, endIndex) {
        console.log("audio lists drag end:", fromIndex, endIndex);
    }
};

export {
    options
}