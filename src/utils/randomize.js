const platforms = ['TikTok', 'Instagram', 'YouTube', 'Facebook', 'Twitch', 'Patreon', 'Substack', 'OnlyFans', 'Freelancer', 'Upwork', 'Fiverr', ''];
const firstNames = ['Sower', 'James', 'Sarah', 'Michael', 'Linda', 'David', 'Jessica', 'Kwame', 'Amara'];
const lastNames = ['Boja', 'Smith', 'Johnson', 'Boateng', 'Mensah', 'Davis', 'Wilson', 'Brown', 'Kofi', 'Osei'];

const notes = [
    'Your funds have been successfully delivered. Enjoy!',
    'Payout for recent content creation engagement.',
    'Monthly creator bonus successfully processed.',
    'Ad revenue share for the period of 1-15 Jan.',
    'Referral bonus payout for your active community.',
    'Tips and donations from your latest stream.'
];

export const getRandomReceipt = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const amount = (Math.random() * 50 + 1).toFixed(2);
    const note = notes[Math.floor(Math.random() * notes.length)];
    const date = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return {
        name: `${firstName} ${lastName}`,
        amount,
        platform,
        date,
        note
    };
};
