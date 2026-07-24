// TODO: Integrate Nodemailer or SendGrid for actual email delivery

export const EmailService = {
  async sendBookingConfirmation(booking: any, customer: any, bike: any): Promise<void> {
    console.log(`[Email Placeholder] Sending booking confirmation to ${customer.email} for booking ${booking.id}`);
    console.log(`[Email Placeholder] Content: You have booked ${bike.brand} ${bike.name} from ${booking.startDate} to ${booking.endDate}.`);
  },

  async sendContactNotification(inquiry: any): Promise<void> {
    console.log(`[Email Placeholder] New contact inquiry received from ${inquiry.name} (${inquiry.email})`);
    console.log(`[Email Placeholder] Message: ${inquiry.message}`);
  }
};
