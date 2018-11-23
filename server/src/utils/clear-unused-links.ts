import mongoose from 'mongoose';

const ONE_DAY = 86400000;

export function clearUnusedLinks() {
    clear();
    setInterval(clear, ONE_DAY / 4);
}

async function clear() {
    const Link = mongoose.model('Link');
    const acceptableLastClick = Date.now() - 7 * ONE_DAY;
    const response = await Link.deleteMany({ lastClick: { $lte: acceptableLastClick } }) as any;
    console.log(`New scan, removed ${response.result.n} unused links`);
}
