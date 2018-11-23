/*
    自实现音频播放组件
    musicSrc 音频src
    musicTitle  音频名称
*/
import React, { Component } from 'react'
import { Button, Select, Row, Col, Layout, Progress, Icon, Slider} from 'antd'
import moment from 'moment'
const Option = Select.Option
const { Footer } = Layout;
import { formatTime } from '../../utils/index';

export default class MusicPlayer extends Component {
    constructor(props){
        super(props);
        this.audio = null;
        this.state = {
            nowTime: '00:00', 
            endTime: '00:00',
            timePercent:0,
            soundPercent:100,  
            isPlay:false,
            audio:null
        }; 
    }

    // 组件加载时
    componentDidMount() {
        this.bindEvents(this.audio);
    }

    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //             nowTime: '00:00', 
    //             endTime: '00:00',
    //             timePercent:0,
    //             soundPercent:100,  
    //             isPlay:false,
    //             audio:null
    //     });
    // }


    // 绑定 audio 标签的事件
    bindEvents = (
        target = this.audio,
        eventsNames = {
          waiting: this.loadAndPlayAudio,
          canplay: this.onPlay,
          error: this.onAudioLoadError,
          ended: this.audioEnd,
          seeked: this.onAudioSeeked,
          pause: this.onPauseAudio,
          play: this.onAudioPlay,
          timeupdate: this.audioTimeUpdate,
          volumechange: this.onAudioVolumeChange,
          stalled: this.onAudioLoadError, //当浏览器尝试获取媒体数据，但数据不可用时
          abort: this.onAudioAbort
        },
        bind = true
      ) => {
        const { once } = this.props;
        for (let name in eventsNames) {
          const _events = eventsNames[name];
          bind
            ? target.addEventListener(name, _events)
            : target.removeEventListener(name, _events);
        }
    };

    //播放进度时更新，修改当前时间及时间进度条的开始时间 currentTime
    audioTimeUpdate = () => {
        var progressPer;
        if(this.audio.currentTime == 0){  // 此处刚开始 this.audio.currentTime为0时，this.audio.duration为NAN，可能会导致错误
            progressPer = 0;
        }else{
            progressPer = Math.floor(this.audio.currentTime/this.audio.duration*100)
        }
        this.setState({ nowTime: formatTime(this.audio.currentTime), timePercent: progressPer});
        if(progressPer==100){
            this.setState({ isPlay: false});
        }
    };

   
    //设置音频总长度，进度条的结束时间 duration
    setAudioLength = () => {
        this.setState({
            endTime: formatTime(this.audio.duration)
        });
    };

    //播放
    onPlay = () =>{
        this.setAudioLength();
        this.audio.play();
        this.setState({
            isPlay: true
        });
    };

    // 暂停
    onPause = () =>{
        this.audio.pause();
        this.setState({ isPlay: false});
    }

    // 设置播放速率 playbackRate
    rateChange = (value)=>{
        console.log(value)
        this.audio.playbackRate = value;
    }

     // 设置声音大小
    soundChange = (value)=>{
        this.setState({ soundPercent: value});
        this.audio.volume = value/100;
    }

    // 重新加载
    onReload = ()=>{
        console.log(this.audio);
        this.audio.load();
        this.setState({
            isPlay: true,
            noeTime:'00:00',
            timePercent:0
        });
        this.audio.play();
        
    }

    // 拖拽进度条时设置播放进度
    progressChange = (value)=>{
        this.audio.currentTime = value/100*this.audio.duration;
        this.setState({ nowTime: formatTime(value/100*this.audio.duration), timePercent: value});
    }

    // 下载文件
    onDownload = () =>{
        const { musicSrc, musicTitle:name } = this.props;
        if (name && musicSrc) {
            this.downloadNode = document.createElement("a");
            this.downloadNode.setAttribute("download",musicSrc.split('/')[musicSrc.split('/').length-1]);
            this.downloadNode.setAttribute("href", musicSrc);
            this.downloadNode.click();
            this.downloadNode = undefined;
          }
    }

   
    // 关闭
    closeRecord = ()=>{
        this.audio.pause();
        this.setState({isPlay:false})

        this.props.closeRecord();
    }

    
    rateOptions(){
        return  (
         <Select defaultValue="" style={{ width: 60 }} onChange={this.rateChange}>
             <Option value="" disabled>倍速</Option>
             <Option value="0.5">0.5</Option>
             <Option value="1">1</Option>
             <Option value="1.25">1.25</Option>
             <Option value="1.5">1.5</Option>
             <Option value="2">2.0</Option>
         </Select>)
     }
 
     controlIcons(){
         var icons = [];
         
         icons.push(this.state.isPlay?<Icon  onClick={this.onPause} title={'暂停'} style={{ fontSize: '26px', cursor: 'pointer'}} type="pause-circle" />:<Icon onClick={this.onPlay} title={'播放'} style={{ fontSize: '26px', cursor: 'pointer'}} type="play-circle" />)
         icons.push(<Icon onClick={this.onDownload} title={'下载'} style={{ fontSize: '32px', cursor: 'pointer'}} type="cloud-download" />)
         icons.push(<Icon onClick={this.onReload} title={'刷新'} style={{ fontSize: '26px', cursor: 'pointer'}} type="sync" />)
         return icons;
     }


    render(){
        //const {item} = this.props;
        const footerStyle = {
            height:'80px',
            color: '#fff',
            background: 'rgba(0,0,0,.7)'
        }

        const contentStyle = {
            dispaly:'flex',
            height:'100%',
            padding:'0 30px',
            position:'relative',
            justifyContent: 'center',
            alignItems: 'center'
        }

        const processBarStyle = {
            width:'45%',
            padding:'0 20px',
        }

        const titleStyle = {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'inline-block',
            maxwidth: '400px'
        }

        const audioStyle = {
            width:'100%',
            display:'flex',
            justifyContent: 'center',
            marginTop: '6px'
        }

        const nowTimeStyle = {
            fontSize: '12px'
        }

        const controlStyle = {
            padding: '0 0 0 5%',
            width:'50%',
            display:'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }

        const { nowTime, endTime, timePercent, soundPercent} = this.state;
        const { musicSrc, musicTitle } = this.props;

        return (
            <div>
                <Layout>     
                    <Footer style={footerStyle}>
                    
                        <div style={{display:'flex',height:'100%', padding:'0 30px',justifyContent: 'center',alignItems: 'center'}}>
                           
                            <div style={processBarStyle}>
                                <div style={titleStyle}>{musicTitle}</div>
                                <div style={audioStyle}>
                                    <div style={nowTimeStyle}>{nowTime}</div>
                                    <Slider onChange={this.progressChange} tipFormatter={null} style={{flex:'1 1 auto',width: '100%', margin:'0px 20px'}} value={timePercent} />
                                    <div style={nowTimeStyle}>{endTime}</div>
                                </div>
                            </div>
                            
                            <div style={controlStyle}>
                                {this.controlIcons()}
                                {this.rateOptions()}
                                {this.state.soundPercent>0? <Icon style={{ fontSize: '28px', cursor: 'pointer'}} type="sound" />:<Icon style={{ fontSize: '28px', cursor: 'pointer'}} type="sound" />}
                                <Slider style={{width: '30%'}} value={soundPercent}  onChange={this.soundChange}/>
                                <Icon onClick={this.closeRecord} title={'关闭'} style={{ fontSize: '26px', cursor: 'pointer'}} type="close-circle" />
                            </div>
                        </div>
                        <audio
                            src={musicSrc}
                            preload={"auto"}
                            ref={node => (this.audio = node)}
                        ></audio>
                    </Footer>
                </Layout>
            </div>
        )
    }
}