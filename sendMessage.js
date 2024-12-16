export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { chat_id, text } = req.body;

        // Ambil token dari Environment Variables di Vercel
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id, text, parse_mode: 'html' }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}