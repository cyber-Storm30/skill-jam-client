import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const VideoWebView = ({videoUrl}) => {
  return (
    <View style={{width: '100%', height: 200}}>
      <WebView
        source={{uri: videoUrl}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
};

export default VideoWebView;
