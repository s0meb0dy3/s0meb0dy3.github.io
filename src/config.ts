export const site = {
  name: 'Yi’s Blog',
  author: '子毅',
  description: '子毅的个人博客。计算机研究生，关注 AI、Agent、阅读、投资与运动。在这里表达自己，记录自己。',
};

export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const formatDate = (date: Date) => date.toISOString().slice(0, 10).replaceAll('-', '.');
