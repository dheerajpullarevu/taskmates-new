import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalVideoTrack
} from 'agora-rtc-react';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

export const initializeVideoChat = async (channelName: string, uid: string) => {
  await client.join(
    import.meta.env.VITE_AGORA_APP_ID,
    channelName,
    null,
    uid
  );

  const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  const localVideoTrack = await AgoraRTC.createCameraVideoTrack();

  await client.publish([localAudioTrack, localVideoTrack]);

  return {
    client,
    localAudioTrack,
    localVideoTrack
  };
};

export const leaveChannel = async (
  client: IAgoraRTCClient,
  localAudioTrack?: ILocalAudioTrack,
  localVideoTrack?: ILocalVideoTrack
) => {
  localAudioTrack?.close();
  localVideoTrack?.close();
  await client.leave();
};