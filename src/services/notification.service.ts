import { prisma } from '@/lib/prisma';
import { EmailProvider } from './providers/email.provider';
import { WhatsAppProvider } from './providers/whatsapp.provider';

export const NotificationService = {
  /**
   * Process and send notifications for a new booking
   */
  async processBookingNotification(bookingId: string) {
    try {
      // Fetch full booking details for the email
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          customer: true,
          bikeUnit: {
            include: {
              bike: true
            }
          }
        }
      });

      if (!booking) {
        console.error(`[NotificationService] Booking ${bookingId} not found`);
        return;
      }

      try {
        // Send emails and WhatsApp messages concurrently
        const notificationPromises = [
          EmailProvider.sendBookingEmail(booking),
          WhatsAppProvider.sendAdminBookingNotification(booking)
        ];
        
        if (booking.customer?.email) {
          notificationPromises.push(EmailProvider.sendCustomerBookingEmail(booking));
        }
        
        if (booking.customer?.phone) {
          notificationPromises.push(WhatsAppProvider.sendCustomerBookingNotification(booking));
        }
        
        await Promise.allSettled(notificationPromises);
        
        await prisma.booking.update({
          where: { id: bookingId },
          data: { 
            emailSent: true,
            notificationError: null,
          }
        });
        console.log(`[NotificationService] Successfully sent email for booking ${bookingId}`);
      } catch (emailError: any) {
        console.error(`[NotificationService] Failed to send email for booking ${bookingId}:`, emailError);
        await prisma.booking.update({
          where: { id: bookingId },
          data: { 
            emailSent: false,
            notificationError: emailError?.message || 'Failed to send email'
          }
        });
      }
    } catch (error) {
      console.error(`[NotificationService] Error processing booking notification:`, error);
    }
  },

  /**
   * Process and send notifications for a contact inquiry or popup lead
   */
  async processLeadNotification(inquiryId: string) {
    try {
      const inquiry = await prisma.contactInquiry.findUnique({
        where: { id: inquiryId }
      });

      if (!inquiry) {
        console.error(`[NotificationService] Inquiry ${inquiryId} not found`);
        return;
      }

      try {
        // Send emails and WhatsApp concurrently
        await Promise.allSettled([
          EmailProvider.sendLeadEmail(inquiry),
          WhatsAppProvider.sendAdminLeadNotification(inquiry),
          WhatsAppProvider.sendCustomerLeadNotification(inquiry)
        ]);
        
        await prisma.contactInquiry.update({
          where: { id: inquiryId },
          data: { 
            emailSent: true,
            notificationError: null,
          }
        });
        console.log(`[NotificationService] Successfully sent email for inquiry ${inquiryId}`);
      } catch (emailError: any) {
        console.error(`[NotificationService] Failed to send email for inquiry ${inquiryId}:`, emailError);
        await prisma.contactInquiry.update({
          where: { id: inquiryId },
          data: { 
            emailSent: false,
            notificationError: emailError?.message || 'Failed to send email'
          }
        });
      }
    } catch (error) {
      console.error(`[NotificationService] Error processing lead notification:`, error);
    }
  }
};
