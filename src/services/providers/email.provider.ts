import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');
const fromEmail = process.env.EMAIL_FROM || 'bookings@singhjibikes.com';
const adminEmails = [
  process.env.ADMIN_EMAIL_1 || 'admin@singhjibikes.com',
  process.env.ADMIN_EMAIL_2,
].filter(Boolean) as string[];

export const EmailProvider = {
  async sendBookingEmail(booking: any) {
    if (!process.env.RESEND_API_KEY) {
      console.warn('[EmailProvider] RESEND_API_KEY missing. Simulating booking email.');
      return { id: 'simulated_email_id' };
    }

    const { customer, bikeUnit, startDate, endDate, totalDays, totalAmount, notes, id, createdAt } = booking;
    const bike = bikeUnit?.bike;

    const html = `
      <div style="font-family: Arial, sans-serif; max-w-md: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #d97706;">New Booking Request - ${bike?.brand} ${bike?.name}</h2>
        <p>A new booking request has been submitted on Singh Ji's Bike Rental.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Booking ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${id}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customer?.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customer?.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customer?.phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Vehicle:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bike?.brand} ${bike?.name} (Reg: ${bikeUnit?.registrationNumber})</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Start Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(startDate).toLocaleDateString()}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>End Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(endDate).toLocaleDateString()}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Duration:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${totalDays} days</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Estimated Amount:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">₹${totalAmount}</td></tr>
          ${notes ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Notes:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${notes}</td></tr>` : ''}
        </table>
        
        <p style="margin-top: 30px; font-size: 12px; color: #888;">
          Submitted at: ${new Date(createdAt).toLocaleString()}
        </p>
      </div>
    `;

    try {
      const data = await resend.emails.send({
        from: `Singh Ji's Bike Rental <${fromEmail}>`,
        to: adminEmails,
        replyTo: customer?.email,
        subject: `New Bike Booking Request - ${bike?.name} - ${new Date(startDate).toLocaleDateString()}`,
        html,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  async sendLeadEmail(inquiry: any) {
    if (!process.env.RESEND_API_KEY) {
      console.warn('[EmailProvider] RESEND_API_KEY missing. Simulating lead email.');
      return { id: 'simulated_email_id' };
    }

    const isPopup = inquiry.source === 'POPUP_LEAD';
    const title = isPopup ? 'New Website Lead (Popup)' : 'New Contact Enquiry';

    const html = `
      <div style="font-family: Arial, sans-serif; max-w-md: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #2563eb;">${title}</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inquiry.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inquiry.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inquiry.phone}</td></tr>
          ${inquiry.preferredBike ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Preferred Vehicle:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inquiry.preferredBike}</td></tr>` : ''}
          ${inquiry.pickupLocation ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Pickup Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inquiry.pickupLocation}</td></tr>` : ''}
          ${inquiry.rentalDate ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Rental Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inquiry.rentalDate}</td></tr>` : ''}
          ${inquiry.message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inquiry.message}</td></tr>` : ''}
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Source:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inquiry.source}</td></tr>
        </table>
        
        <p style="margin-top: 30px; font-size: 12px; color: #888;">
          Submitted at: ${new Date(inquiry.createdAt).toLocaleString()}
        </p>
      </div>
    `;

    try {
      const data = await resend.emails.send({
        from: `Singh Ji's Bike Rental <${fromEmail}>`,
        to: adminEmails,
        replyTo: inquiry.email,
        subject: `${title} - ${inquiry.name}`,
        html,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
};
