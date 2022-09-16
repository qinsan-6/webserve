const config ={
    server:{
        post:process.env.SERVE_POST
    },
    db:{
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE
    },
    log:{
        "appenders": {
            "access": { "type": "file","filename":'logs/access.log' },
            "consoleout": { "type": "console" }
          },
          "categories": {
            "default": { "appenders": [ "consoleout" ], "level": "info" },
            "access": { "appenders": [ "access" ], "level": "info" }
          }
    }
}

export default config