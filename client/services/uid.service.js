import ShortUniqueId from 'short-unique-id';

export function uid(length) {
    const uid = new ShortUniqueId();
    return uid.randomUUID(length);
}
