import { getImage } from 'astro:assets';
import munger from '../assets/portraits/munger.jpg';
import feynman from '../assets/portraits/feynman.png';
import dijkstra from '../assets/portraits/dijkstra.jpg';

const originals = { munger, feynman, dijkstra };
export const portraits = Object.fromEntries(await Promise.all(
  Object.entries(originals).map(async ([id, src]) => {
    const image = await getImage({ src, width: 720, format: 'webp', quality: 85 });
    return [id, image.src];
  }),
));

export const portraitCredits: Record<string, { url: string; credit: string }> = {
  munger: {
    url: 'https://commons.wikimedia.org/wiki/File:Charlie_Munger_(cropped).jpg',
    credit: '查理·芒格肖像 · 摄影 Nick · CC BY 2.0 (https://creativecommons.org/licenses/by/2.0/) · 已压缩、灰度显示与裁切',
  },
  feynman: {
    url: 'https://commons.wikimedia.org/wiki/File:Richard_Feynman_1959.png',
    credit: 'Richard Feynman 肖像 · Caltech《The Big T》1959 年年鉴 · 摄影者未署名 · 来源标注在美国属公有领域，其他地区状态见来源页 · 已压缩与裁切',
  },
  dijkstra: {
    url: 'https://commons.wikimedia.org/wiki/File:Edsger_Wybe_Dijkstra_(square).jpg',
    credit: 'Edsger W. Dijkstra 肖像 · 摄影 Hamilton Richards · CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/) · 已压缩、灰度显示与裁切，修改版本沿用同一授权',
  },
};
