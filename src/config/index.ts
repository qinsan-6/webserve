const config ={
    server:{
        post:process.env.SERVE_POST,
        server: 'http://' + process.env.HOST + ':' + process.env.SERVE_POST+'/' 
    },
    db:{
        host:process.env.HOST,
        username:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE
    },
    log:{
        "appenders": {
            "access": { "type": "file","filename":'logs/access.log' },
            "db": { "type": "file","filename":'logs/db.log' },
            "readfile": { "type": "file","filename":'logs/readfile.log' },
            "consoleout": { "type": "console" },
            "AI": { "type": "file","filename":'logs/ai.log' },
          },
          "categories": {
            "access": { "appenders": [ "access" ], "level": "info" },
            "db": { "appenders": [ "db" ], "level": "info" },
            "readfile": { "appenders": [ "readfile" ], "level": "info" },
            "AI": { "appenders": [ "AI" ], "level": "info" },
            "default": { "appenders": [ "consoleout" ], "level": "info" },
          }
    },
    keys:{
        tokenkey:'choumugua',
        pageendflag:process.env.PAGEENDFLAG,
        enterflag:process.env.ENTERFLAG,
        hashSalt:10
    }
}

export default config