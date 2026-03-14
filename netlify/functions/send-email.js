// netlify/functions/send-email.js
// La RESEND_API_KEY sta nelle variabili d'ambiente di Netlify — mai nel codice

exports.handler = async (event) => {
  // Solo POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Chiave segreta dall'ambiente Netlify
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'RESEND_API_KEY non configurata' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Payload non valido' }) };
  }

  const { to, subject, html, attachments, from, adminEmail, adminHtml } = payload;

  if (!to || !subject || !html || !from) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Campi obbligatori mancanti' }) };
  }

  try {
    // Email all'utente
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify({ from, to: [to], subject, html, attachments }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { statusCode: 500, body: JSON.stringify({ error: err }) };
    }

    // Copia admin (opzionale)
    if (adminEmail && adminHtml) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_KEY}`,
        },
        body: JSON.stringify({
          from,
          to: [adminEmail],
          subject: `📋 Nuovo RSVP — ${subject}`,
          html: adminHtml,
        }),
      });
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true }),
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
