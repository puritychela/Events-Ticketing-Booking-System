import db from './db';
import {
  user,
  venue,
  event,
  booking,
  payment,
  supportTicket,
} from './schema';

(async function seed() {
  try {
    // Clear tables first (respecting FK order)
    await db.delete(supportTicket);
    await db.delete(payment);
    await db.delete(booking);
    await db.delete(event);
    await db.delete(venue);
    await db.delete(user);

    // 1. Users
    const insertedUsers = await db
      .insert(user)
      .values([
        {
          firstname: 'Alice',
          lastname: 'Wanjiku',
          email: 'alice@example.com',
          password: 'hashedPassword1',
          contactPhone: '0712345678',
          address: 'Nairobi, Kenya',
          role: 'user',
        },
        {
          firstname: 'Bob',
          lastname: 'Mwangi',
          email: 'bob@example.com',
          password: 'hashedPassword2',
          contactPhone: '0722333444',
          address: 'Thika, Kenya',
          role: 'admin',
        },
        {
          firstname: 'Carol',
          lastname: 'Mutua',
          email: 'carol@example.com',
          password: 'hashedPassword3',
          contactPhone: '0733111222',
          address: 'Nakuru, Kenya',
          role: 'user',
        },
        {
          firstname: 'David',
          lastname: 'Kariuki',
          email: 'david@example.com',
          password: 'hashedPassword4',
          contactPhone: '0744556677',
          address: 'Eldoret, Kenya',
          role: 'user',
        },
      ])
      .returning();

    // 2. Venues
    const insertedVenues = await db
      .insert(venue)
      .values([
        {
          name: 'KICC Conference Hall',
          address: 'City Hall Way, Nairobi',
          capacity: 300,
        },
        {
          name: 'Sarit Expo Centre',
          address: 'Westlands, Nairobi',
          capacity: 500,
        },
        {
          name: 'Nyayo Stadium',
          address: 'Langata Road, Nairobi',
          capacity: 1500,
        },
        {
          name: 'Kenyatta Stadium',
          address: 'Machakos Town',
          capacity: 800,
        },
      ])
      .returning();

    // 3. Events
    const insertedEvents = await db
      .insert(event)
      .values([
        {
          title: 'Tech Summit 2025',
          description: 'A technology conference showcasing the latest innovations.',
          venueId: insertedVenues[0].venueId,
          category: 'Technology',
          date: '2025-08-10',
          time: '10:00:00',
          ticketPrice: '1500.00',
          ticketsTotal: 300,
        },
        {
          title: 'Music Fiesta',
          description: 'An outdoor music concert with local artists.',
          venueId: insertedVenues[1].venueId,
          category: 'Music',
          date: '2025-09-05',
          time: '17:00:00',
          ticketPrice: '2000.00',
          ticketsTotal: 500,
        },
        {
          title: 'Business Expo',
          description: 'Networking for local entrepreneurs.',
          venueId: insertedVenues[2].venueId,
          category: 'Business',
          date: '2025-07-20',
          time: '09:00:00',
          ticketPrice: '1000.00',
          ticketsTotal: 700,
        },
        {
          title: 'Health & Wellness Fair',
          description: 'A day for promoting healthy lifestyles.',
          venueId: insertedVenues[3].venueId,
          category: 'Health',
          date: '2025-10-15',
          time: '08:00:00',
          ticketPrice: '1200.00',
          ticketsTotal: 800,
        },
      ])
      .returning();

    // 4. Bookings
    const insertedBookings = await db
      .insert(booking)
      .values([
        {
          userId: insertedUsers[0].userId,
          eventId: insertedEvents[0].eventId,
          quantity: 2,
          totalAmount: '3000.00',
          bookingStatus: 'Confirmed',
        },
        {
          userId: insertedUsers[1].userId,
          eventId: insertedEvents[1].eventId,
          quantity: 1,
          totalAmount: '2000.00',
          bookingStatus: 'Pending',
        },
        {
          userId: insertedUsers[2].userId,
          eventId: insertedEvents[2].eventId,
          quantity: 3,
          totalAmount: '3000.00',
          bookingStatus: 'Confirmed',
        },
        {
          userId: insertedUsers[3].userId,
          eventId: insertedEvents[3].eventId,
          quantity: 1,
          totalAmount: '1200.00',
          bookingStatus: 'Cancelled',
        },
      ])
      .returning();

    // 5. Payments
    await db.insert(payment).values([
      {
        bookingId: insertedBookings[0].bookingId,
        amount: '3000.00',
        paymentStatus: 'Paid',
        paymentMethod: 'M-Pesa',
        transactionId: 'MP1234567890',
      },
      {
        bookingId: insertedBookings[1].bookingId,
        amount: '2000.00',
        paymentStatus: 'Pending',
        paymentMethod: 'Card',
        transactionId: 'TX9988776655',
      },
      {
        bookingId: insertedBookings[2].bookingId,
        amount: '3000.00',
        paymentStatus: 'Paid',
        paymentMethod: 'Bank Transfer',
        transactionId: 'BT5566778899',
      },
      {
        bookingId: insertedBookings[3].bookingId,
        amount: '1200.00',
        paymentStatus: 'Failed',
        paymentMethod: 'M-Pesa',
        transactionId: 'MP4455667788',
      },
    ]);

    // 6. Support Tickets
    await db.insert(supportTicket).values([
      {
        userId: insertedUsers[0].userId,
        subject: 'Ticket not received',
        description: 'I booked two tickets but haven’t received a confirmation.',
      },
      {
        userId: insertedUsers[1].userId,
        subject: 'Event update request',
        description: 'Please update the event time for the Tech Summit.',
      },
      {
        userId: insertedUsers[2].userId,
        subject: 'Payment issue',
        description: 'My card was charged but booking not confirmed.',
      },
      {
        userId: insertedUsers[3].userId,
        subject: 'Cancel my booking',
        description: 'Please cancel my booking for the Health Fair.',
      },
    ]);

    console.log('✅ Seeding completed with 4+ entries per table!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  }
})();



