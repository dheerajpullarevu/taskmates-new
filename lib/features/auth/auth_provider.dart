import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final authProvider = Provider<FirebaseAuth>((ref) => FirebaseAuth.instance);

final authStateProvider = StreamProvider<User?>((ref) {
  return ref.watch(authProvider).authStateChanges();
});

final phoneAuthProvider = StateNotifierProvider<PhoneAuthNotifier, AsyncValue<void>>((ref) {
  return PhoneAuthNotifier(ref.watch(authProvider));
});

class PhoneAuthNotifier extends StateNotifier<AsyncValue<void>> {
  PhoneAuthNotifier(this._auth) : super(const AsyncValue.data(null));

  final FirebaseAuth _auth;
  String? _verificationId;

  Future<void> sendOTP(String phoneNumber) async {
    try {
      state = const AsyncValue.loading();
      
      await _auth.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        verificationCompleted: (PhoneAuthCredential credential) async {
          await _auth.signInWithCredential(credential);
          state = const AsyncValue.data(null);
        },
        verificationFailed: (FirebaseAuthException e) {
          state = AsyncValue.error(e, StackTrace.current);
        },
        codeSent: (String verificationId, int? resendToken) {
          _verificationId = verificationId;
          state = const AsyncValue.data(null);
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          _verificationId = verificationId;
        },
      );
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }

  Future<void> verifyOTP(String otp) async {
    try {
      state = const AsyncValue.loading();
      
      final credential = PhoneAuthProvider.credential(
        verificationId: _verificationId!,
        smsCode: otp,
      );
      
      await _auth.signInWithCredential(credential);
      state = const AsyncValue.data(null);
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }
}