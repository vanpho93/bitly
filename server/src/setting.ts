interface ServerConfig {
    DATABASE_URI: string;
    FRONT_END_URL: string;
    SERVER_URL: string;
    SHOULD_KEEP_ALIVE?: boolean;
}

const testingConfig: ServerConfig = {
    DATABASE_URI: 'mongodb://localhost/bitly-test',
    FRONT_END_URL: 'https://myslink.herokuapp.com',
    SERVER_URL: 'http://localhost:4000',
}

const developmentConfig: ServerConfig = {
    DATABASE_URI: 'mongodb://localhost/bitly',
    FRONT_END_URL: 'http://localhost:3000',
    SERVER_URL: 'http://localhost:4000'
};

const staggingConfig: ServerConfig = {
    DATABASE_URI: 'mongodb://admin:abc123@ds251632.mlab.com:51632/kpi',
    FRONT_END_URL: 'https://myslink.herokuapp.com',
    SERVER_URL: 'https://api-kpibsc.herokuapp.com',
}

// TODO update production config to run in production mode
// const productionConfig: ServerConfig = {};

function getConfig(): ServerConfig {
    if (process.env.NODE_ENV === 'test') return testingConfig;
    if (process.env.NODE_ENV === 'production') return staggingConfig;
    return developmentConfig;
}

export const { DATABASE_URI, FRONT_END_URL, SERVER_URL, SHOULD_KEEP_ALIVE } = getConfig();
