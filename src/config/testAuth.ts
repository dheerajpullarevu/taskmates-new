// Test account configuration for development
export const TEST_PHONE_NUMBER = '+919916666560';
export const TEST_OTP = '123456';

// Test user profile
export const TEST_USER = {
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@taskmates.in',
  phoneNumber: '+919916666560',
  role: 'taskgiver' as const,
  roles: ['taskgiver', 'tasktaker'],
  activeRole: 'taskgiver' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  wallet: {
    balance: 5000,
    transactions: [
      {
        id: 'tx1',
        type: 'deposit',
        amount: 5000,
        description: 'Initial deposit',
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    ]
  },
  rating: 4.5,
  tasksCompleted: 12,
  location: {
    address: 'Bangalore, Karnataka',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    pincode: '560001',
    latitude: 12.9716,
    longitude: 77.5946
  }
};