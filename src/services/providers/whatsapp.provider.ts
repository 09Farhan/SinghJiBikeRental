export const WhatsAppProvider = {
  /**
   * Base method to call Meta WhatsApp Cloud API
   */
  async sendMessage(payload: any) {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const token = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !token) {
      console.warn('[WhatsAppProvider] Missing WhatsApp credentials in environment variables');
      return;
    }

    const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          ...payload
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[WhatsAppProvider] Meta API Error:', JSON.stringify(errorData, null, 2));
        throw new Error('WhatsApp API error');
      }

      return await response.json();
    } catch (error) {
      console.error('[WhatsAppProvider] Failed to send message:', error);
      throw error;
    }
  },

  /**
   * Helper to format Indian phone numbers correctly for the API
   * Must include country code without '+', e.g., '919876543210'
   */
  formatPhoneNumber(phone: string) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) return `91${cleaned}`;
    if (cleaned.startsWith('0') && cleaned.length === 11) return `91${cleaned.substring(1)}`;
    return cleaned; // assume it already has a country code if > 10 and doesn't start with 0
  },

  // ----------------------------------------------------------------------
  // ADMIN NOTIFICATIONS (Standard Text Messages)
  // ----------------------------------------------------------------------

  async sendAdminBookingNotification(booking: any) {
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
    if (!adminPhone) return;

    const message = `*🚨 New Booking Alert!*\n\n` +
      `*Customer:* ${booking.customer.name}\n` +
      `*Phone:* ${booking.customer.phone}\n` +
      `*Vehicle:* ${booking.bikeUnit.bike.name} (${booking.bikeUnit.registrationNumber})\n` +
      `*Dates:* ${new Date(booking.startDate).toLocaleDateString()} to ${new Date(booking.endDate).toLocaleDateString()}\n` +
      `*Total:* ₹${booking.totalAmount}\n\n` +
      `Please check the admin dashboard for more details.`;

    await this.sendMessage({
      to: this.formatPhoneNumber(adminPhone),
      type: 'text',
      text: { body: message }
    });
  },

  async sendAdminLeadNotification(inquiry: any) {
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
    if (!adminPhone) return;

    const message = `*📥 New Contact Inquiry!*\n\n` +
      `*Name:* ${inquiry.name}\n` +
      `*Phone:* ${inquiry.phone}\n` +
      `*Email:* ${inquiry.email}\n` +
      (inquiry.preferredBike ? `*Interested In:* ${inquiry.preferredBike}\n` : '') +
      `*Message:* ${inquiry.message || 'No message provided'}`;

    await this.sendMessage({
      to: this.formatPhoneNumber(adminPhone),
      type: 'text',
      text: { body: message }
    });
  },

  // ----------------------------------------------------------------------
  // CUSTOMER NOTIFICATIONS (Template Messages)
  // ----------------------------------------------------------------------

  async sendCustomerBookingNotification(booking: any) {
    if (!booking.customer.phone) return;

    const templateName = process.env.WHATSAPP_TEMPLATE_BOOKING || 'booking_confirmation';

    await this.sendMessage({
      to: this.formatPhoneNumber(booking.customer.phone),
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: booking.customer.name },
              { type: 'text', text: booking.bikeUnit.bike.name },
              { type: 'text', text: new Date(booking.startDate).toLocaleDateString() },
              { type: 'text', text: new Date(booking.endDate).toLocaleDateString() }
            ]
          }
        ]
      }
    });
  },

  async sendCustomerLeadNotification(inquiry: any) {
    if (!inquiry.phone) return;

    const templateName = process.env.WHATSAPP_TEMPLATE_LEAD || 'lead_confirmation';

    await this.sendMessage({
      to: this.formatPhoneNumber(inquiry.phone),
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: inquiry.name }
            ]
          }
        ]
      }
    });
  }
};
