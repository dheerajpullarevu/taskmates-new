import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app } from '../config/firebase';
import { getAnalytics, logEvent } from 'firebase/analytics';

const messaging = getMessaging(app);
const analytics = getAnalytics(app);

interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, string>;
  image?: string;
}

export const initializeNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });

      // Log analytics event
      logEvent(analytics, 'notification_permission_granted');
      
      return token;
    }
  } catch (error) {
    console.error('Notification initialization failed:', error);
    logEvent(analytics, 'notification_initialization_failed');
  }
};

export const sendPushNotification = async (userId: string, notification: NotificationPayload) => {
  try {
    const response = await fetch('/api/notifications/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        notification
      }),
    });

    if (!response.ok) throw new Error('Failed to send push notification');
    
    logEvent(analytics, 'push_notification_sent');
  } catch (error) {
    console.error('Push notification failed:', error);
    logEvent(analytics, 'push_notification_failed');
  }
};

export const sendEmailNotification = async (email: string, subject: string, content: string) => {
  try {
    const response = await fetch('/api/notifications/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        subject,
        content
      }),
    });

    if (!response.ok) throw new Error('Failed to send email notification');
    
    logEvent(analytics, 'email_notification_sent');
  } catch (error) {
    console.error('Email notification failed:', error);
    logEvent(analytics, 'email_notification_failed');
  }
};

export const sendSMSNotification = async (phoneNumber: string, message: string) => {
  try {
    const response = await fetch('/api/notifications/sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        message
      }),
    });

    if (!response.ok) throw new Error('Failed to send SMS notification');
    
    logEvent(analytics, 'sms_notification_sent');
  } catch (error) {
    console.error('SMS notification failed:', error);
    logEvent(analytics, 'sms_notification_failed');
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });