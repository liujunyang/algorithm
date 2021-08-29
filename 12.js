const {SyncHook} = require('tapable')
const hook = new SyncHook()

hook.tap('login', ()=> console.log('fff'))
hook.call()
