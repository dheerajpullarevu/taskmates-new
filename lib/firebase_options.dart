import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform => android;

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyCgbi3aimcJNHng4N9o2-YIf7ODhVbz2P8',
    appId: '1:79003234750:web:553567c3670d4d864809ef',
    messagingSenderId: '79003234750',
    projectId: 'taskmates7',
    storageBucket: 'taskmates7.appspot.com',
    measurementId: 'G-HMPG88T3CQ',
  );
}