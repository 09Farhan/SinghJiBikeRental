import { WhatsAppProvider } from './src/services/providers/whatsapp.provider';
import { EmailProvider } from './src/services/providers/email.provider';

async function testAutomation() {
  console.log('Testing WhatsApp and Email Automation...');
  
  const dummyInquiry = {
    id: 'test-inquiry-123',
    name: 'Test Admin',
    phone: '917365844003',
    email: 'admin@singhjibikes.com',
    preferredBike: 'Hunter 350',
    message: 'This is a test inquiry from the system.'
  };

  try {
    console.log('\n--- 1. Testing WhatsApp Admin Lead Notification ---');
    await WhatsAppProvider.sendAdminLeadNotification(dummyInquiry);
    console.log('✅ WhatsApp API successfully accepted the request!');
  } catch (error: any) {
    console.error('❌ WhatsApp API Error:', error.message);
  }

  try {
    console.log('\n--- 2. Testing Email Lead Notification ---');
    await EmailProvider.sendLeadEmail(dummyInquiry);
    console.log('✅ Email API successfully accepted the request!');
  } catch (error: any) {
    console.error('❌ Email API Error:', error.message);
  }
}

testAutomation();
