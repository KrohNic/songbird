import React, { useState, useEffect, useRef } from "react";
import "./AudioPlayer.scss";
import {
  SEEK_INPUT_SCALE,
  VOLUME_INPUT_MAX,
  PAUSE_ICO,
  PLAY_ICO
} from "./constants.AudioPlayer";
import { formatTime } from "./utils.AudioPlayer";

const AudioPlayer = ({ src }) => {
  const [volume, setVolume] = useState(VOLUME_INPUT_MAX);
  const [volumePreMute, setVolumePreMute] = useState(VOLUME_INPUT_MAX);
  const [audioDuration, setAudioDuration] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [isControlsDisabled, setIsControlsDisabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef();
  const seek = timePassed * SEEK_INPUT_SCALE;
  const seekMax = audioDuration * SEEK_INPUT_SCALE;

  useEffect(() => {
    setIsPlaying(false);
    setTimePassed(0);

    audioRef.current = new Audio(src);

    audioRef.current.addEventListener("canplaythrough", canplayHandler);
    audioRef.current.addEventListener("ended", endedHandler);
    audioRef.current.addEventListener("timeupdate", timeUpdated);
    return () => {
      audioRef.current.pause();

      audioRef.current.removeEventListener("canplaythrough", canplayHandler);
      audioRef.current.removeEventListener("ended", endedHandler);
      audioRef.current.addEventListener("timeupdate", timeUpdated);
    };
  }, [src]);

  const canplayHandler = () => {
    setAudioDuration(audioRef.current.duration);
    setIsControlsDisabled(false);
  };

  const endedHandler = () => {
    setIsPlaying(false);
    setTimePassed(0);
  };

  const seekHandler = event => {
    const seekTime = event.target.value / SEEK_INPUT_SCALE;

    audioRef.current.currentTime = seekTime;
    setTimePassed(seekTime);
  };

  const volumeChangeHandler = event => {
    const newVolume = event.target.value;

    audioRef.current.volume = newVolume / VOLUME_INPUT_MAX;
    setVolume(newVolume);
  };

  const timeUpdated = () => {
    const currentTime = audioRef.current.currentTime;

    setTimePassed(currentTime);
  };

  const playClickHandler = () => {
    if (audioRef.current.paused) {
      audioRef.current.currentTime = seek / SEEK_INPUT_SCALE;

      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const muteClickHandler = () => {
    if (volume === 0) {
      audioRef.current.volume = volumePreMute / VOLUME_INPUT_MAX;
      setVolume(volumePreMute);
    } else {
      audioRef.current.volume = 0;
      setVolumePreMute(volume);
      setVolume(0);
    }
  };

  if (audioRef.current) {
    if (!isPlaying) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
    } else if (
      audioRef.current.paused &&
      audioRef.current.currentTime !== audioRef.current.duration
    ) {
      audioRef.current.play();
    }
  }

  return (
    <div className="audio_player">
      <button
        className="audio_player--play_btn"
        disabled={isControlsDisabled}
        onClick={playClickHandler}
      >
        {isPlaying ? PAUSE_ICO : PLAY_ICO}
      </button>
      <div className="audio_player--time_seek">
        <div className="audio_player--seek prog_range">
          <progress
            className="prog_range-progress"
            value={seek}
            max={seekMax}
            disabled={isControlsDisabled}
          ></progress>
          <input
            className="prog_range-range"
            type="range"
            value={seek}
            max={seekMax}
            onChange={seekHandler}
          />
        </div>
        <div className="audio_player--time_section">
          <div className="audio_player--time">{formatTime(timePassed)}</div>
          <div className="audio_player--duration">
            {formatTime(audioDuration)}
          </div>
        </div>
      </div>
      <button
        className={
          volume > 0 ? "audio_player--mute_btn" : "audio_player--mute_btn-muted"
        }
        onClick={muteClickHandler}
      ></button>
      <div className="audio_player--volume prog_range">
        <progress
          className="prog_range-progress"
          max={VOLUME_INPUT_MAX}
          value={volume}
        ></progress>
        <input
          className="prog_range-range"
          type="range"
          max={VOLUME_INPUT_MAX}
          value={volume}
          onChange={volumeChangeHandler}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
