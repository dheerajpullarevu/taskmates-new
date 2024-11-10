import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:taskmates/features/auth/auth_provider.dart';
import 'package:taskmates/widgets/loading_overlay.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _phoneController = TextEditingController();
  final _otpController = TextEditingController();
  bool _showOTPField = false;

  @override
  void dispose() {
    _phoneController.dispose();
    _otpController.dispose();
    super.dispose();
  }

  Future<void> _sendOTP() async {
    final phoneAuth = ref.read(phoneAuthProvider.notifier);
    await phoneAuth.sendOTP('+91${_phoneController.text}');
    setState(() => _showOTPField = true);
  }

  Future<void> _verifyOTP() async {
    final phoneAuth = ref.read(phoneAuthProvider.notifier);
    await phoneAuth.verifyOTP(_otpController.text);
  }

  @override
  Widget build(BuildContext context) {
    final phoneAuth = ref.watch(phoneAuthProvider);

    return LoadingOverlay(
      isLoading: phoneAuth.isLoading,
      child: Scaffold(
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Welcome to TaskMates',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                const SizedBox(height: 32),
                TextFormField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    labelText: 'Phone Number',
                    prefixText: '+91 ',
                  ),
                ),
                if (_showOTPField) ...[
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: _otpController,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      labelText: 'OTP',
                    ),
                  ),
                ],
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _showOTPField ? _verifyOTP : _sendOTP,
                    child: Text(_showOTPField ? 'Verify OTP' : 'Send OTP'),
                  ),
                ),
                if (phoneAuth.hasError)
                  Padding(
                    padding: const EdgeInsets.only(top: 16),
                    child: Text(
                      phoneAuth.error.toString(),
                      style: TextStyle(
                        color: Theme.of(context).colorScheme.error,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}