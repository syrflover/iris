// 해 드리다 - 원칙
// 해드리다 - 허용
// 말하다
// 그런 말 하다
// 대신 말 해 드리다 ??
export const description = async () => {
    const voices = await import('../../voices.json');
    return `대신 말 해 드려요

# voice list

${voices.map((e, i) => `- ${e.name}`).join('\n')}`.trim();
};
// export const description = 'tts in voice channel';
