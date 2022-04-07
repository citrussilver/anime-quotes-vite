import { reactive } from 'vue'
import axios from "axios";

export let aniQuote = reactive(
    {
        quote: '',
        character: '',
        anime: '',
        quoteLength: 0
    }
)

export const generateAniQuote = async () => {
    
    const response = await fetch('https://animechan.vercel.app/api/random')
    const data = await response.json()

    // try {
    //     const response = await axios.get('https://animechan.vercel.app/api/random');
    //     console.log(response);
    // } catch (err) {
    //     console.error(err);
    // }

    aniQuote.quote = data.quote
    aniQuote.character = data.character
    aniQuote.anime = data.anime

    aniQuote.quoteLength = data.quote.length
    
}