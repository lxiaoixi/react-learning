/*  
    第三方音频播放组件
    audioLists 播放列表
    mode 模式 mini | full,
    showPlayMode 是否显示播放循环方式选择
    toggleMode 是否显示切换模式按钮
    更多配置参考：https://github.com/lijinke666/react-music-player/blob/master/CN.md
*/
import React, { Component } from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
// import {options} from './palyerOption';

class Player extends Component {
    render() {
      const {audioLists, mode='full', showPlayMode=false,toggleMode=false} = this.props;

      const buttons = [
        <select id="selRate" onChange={this.selectRateChange}>
            <option value="" selected>倍速</option>
            <option value="0.5">0.5</option>
            <option value="1">1.0</option>
            <option value="1.25">1.25</option>
            <option value="1.5">1.5</option>
            <option value="2">2.0</option>
        </select>
      ];
      const onRateChange = function(value){
          console.log('88888888')
          console.log('select rate ',value)
      }

    const onAudioPlay=function(audioInfo) {
        console.log("audio playing", audioInfo);
    };
      return (
        <div>
            <ReactJkMusicPlayer 
                audioLists={audioLists} 
                mode={mode}
                preload={true}
                showPlayMode={showPlayMode}
                toggleMode={toggleMode}
                extendsContent={buttons}
                onRateChange={onRateChange}
                onAudioPlay={onAudioPlay}
            />
        </div>
      );
    }
  }

  export default Player
  