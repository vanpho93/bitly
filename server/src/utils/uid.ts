import ShortUniqueId from 'short-unique-id';

export function uid(length: number) {
    const uid = new ShortUniqueId();
    return uid.randomUUID(length);
}
