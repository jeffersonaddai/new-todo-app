module.exports = {
    loadMongo: false,
    usefake: false,
    fakePassword: '8vpawh75ttrcu2',
    user: {
        username: 'admin',
        password: 'adminpassword'
    },
    jwtSecret: 'juctgbekjkjofutrvsggheb,./[]y65321jiejare1215151616lobjuduetkj',
    mongodbUrl: "mongodb://localhost/todo",
    todoStoreProvider: ['in-memory', 'mongodb', 'mongoose'][2]

}