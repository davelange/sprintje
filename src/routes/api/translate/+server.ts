import { json, type RequestHandler } from '@sveltejs/kit';

const ENDPOINT = `https://api-free.deepl.com/v2/translate`;

export const GET: RequestHandler = async ({ url }) => {
  try {
    const word = url.searchParams.get('word') as string;

    const req = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${import.meta.env.VITE_DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `text=${word}&target_lang=NL`
    });

    const data = await req.json();

    return json({ word: data?.translations?.[0].text });
  } catch (err) {
    return json({ message: 'Something went wrong' });
  }
};
