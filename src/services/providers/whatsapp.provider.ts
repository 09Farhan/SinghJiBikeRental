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
    const adminPhones = process.env.ADMIN_WHATSAPP_NUMBER;
    if (!adminPhones) return;

    const phones = adminPhones.split(',').map(p => p.trim()).filter(Boolean);
    
    // Send to all admin numbers concurrently using a template
    await Promise.allSettled(
      phones.map(phone => 
        this.sendMessage({
          to: this.formatPhoneNumber(phone),
          type: 'template',
          template: {
            name: 'admin_booking_alert',
            language: { code: 'en_US' },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: booking.customer.name },
                  { type: 'text', text: booking.customer.phone },
                  { type: 'text', text: booking.bikeUnit.bike.name },
                  { type: 'text', text: booking.bikeUnit.registrationNumber },
                  { type: 'text', text: new Date(booking.startDate).toLocaleDateString() },
                  { type: 'text', text: new Date(booking.endDate).toLocaleDateString() },
                  { type: 'text', text: booking.totalAmount.toString() }
                ]
              }
            ]
          }
        })
      )
    );
  },

  async sendAdminLeadNotification(inquiry: any) {
    const adminPhones = process.env.ADMIN_WHATSAPP_NUMBER;
    if (!adminPhones) return;

    const phones = adminPhones.split(',').map(p => p.trim()).filter(Boolean);
    
    // Send to all admin numbers concurrently using a template
    await Promise.allSettled(
      phones.map(phone => 
        this.sendMessage({
          to: this.formatPhoneNumber(phone),
          type: 'template',
          template: {
            name: 'admin_lead_alert',
            language: { code: 'en_US' },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: inquiry.name },
                  { type: 'text', text: inquiry.phone },
                  { type: 'text', text: inquiry.email },
                  { type: 'text', text: inquiry.preferredBike || 'Not specified' },
                  { type: 'text', text: inquiry.message || 'No message provided' }
                ]
              }
            ]
          }
        })
      )
    );
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
        language: { code: 'en_US' },
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
        language: { code: 'en_US' },
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
