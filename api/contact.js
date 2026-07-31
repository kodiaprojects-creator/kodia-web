import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.RESEND_TO || 'info@kodia.cat';
const FROM_EMAIL = process.env.RESEND_FROM || 'KODIA <info@kodia.cat>';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label, value) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;font-family:monospace;font-size:12px;text-transform:uppercase;color:#666;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;font-family:sans-serif;font-size:15px;color:#111;">${escapeHtml(value)}</td>
  </tr>`;
}

function buildContactEmail(data) {
  const tipusLabels = {
    'one-page': 'One Page',
    corporativa: 'Corporativa',
    'a-mida': 'A mida',
    'no-ho-se': 'No ho sé',
  };

  const subject = `Nou contacte: ${data.nom || 'Sense nom'} — ${data.empresa || 'Sense empresa'}`;
  const html = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;color:#111;">
      <h1 style="font-size:22px;margin:0 0 16px;">Nou missatge des de /contacte</h1>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">
        ${row('Nom', data.nom)}
        ${row('Empresa o projecte', data.empresa)}
        ${row('Email', data.email)}
        ${row('Telèfon', data.telefon)}
        ${row('Web', data.web)}
        ${row('Tipus de projecte', tipusLabels[data.tipus] || data.tipus)}
        ${row('Necessitat', data.necessitat)}
      </table>
    </div>
  `;

  return { subject, html };
}

function buildRevisioEmail(data) {
  const subject = `Revisió digital: ${data.nom || 'Sense nom'} — ${data.empresa || 'Sense empresa'}`;
  const html = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;color:#111;">
      <h1 style="font-size:22px;margin:0 0 16px;">Nova sol·licitud de revisió digital</h1>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">
        ${row('Nom', data.nom)}
        ${row('Empresa o projecte', data.empresa)}
        ${row('Email', data.email)}
        ${row('Web / xarxes', data.web)}
        ${row('Context', data.context)}
        ${row('Objectiu', data.objectiu)}
      </table>
    </div>
  `;

  return { subject, html };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Mètode no permès' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Falta configurar RESEND_API_KEY' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // Honeypot anti-spam
    if (data.website) {
      return res.status(200).json({ ok: true });
    }

    const formType = data.formType === 'revisio-digital' ? 'revisio-digital' : 'contacte';

    if (!data.nom || !data.email || !data.empresa) {
      return res.status(400).json({ error: 'Falten camps obligatoris' });
    }

    if (formType === 'contacte' && !data.necessitat) {
      return res.status(400).json({ error: 'Falten camps obligatoris' });
    }

    if (formType === 'revisio-digital' && (!data.web || !data.context || !data.objectiu)) {
      return res.status(400).json({ error: 'Falten camps obligatoris' });
    }

    const emailContent =
      formType === 'revisio-digital' ? buildRevisioEmail(data) : buildContactEmail(data);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: data.email,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'No s\'ha pogut enviar el missatge' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Error intern del servidor' });
  }
}
