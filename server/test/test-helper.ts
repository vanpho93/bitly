import { User, Link } from '../src/refs';
import { connectDatabase } from '../src/refs';

before(async () => await connectDatabase())

beforeEach(async () => {
    await User.remove({});
    await Link.remove({});
});
