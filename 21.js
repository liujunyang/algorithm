/**
 * 定义 waterfall 序列执行任务包装函数
 *
 * @param tasks
 * @param cb
 * @returns {Promise<*>}
 */
async function waterFall(tasks, cb) {
    cb = cb || function (err) {
        if (err) {
            console.log('err', err)
        } else {
            console.log('done')
        }
    }

    if (!Array.isArray(tasks) || !tasks.length) {
        return cb()
    }

    try {
        let args = []

        for (let i = 0; i < tasks.length; i++) {
            let fn = tasks[i]

            if ((typeof fn) !== 'function') {
                throw 'task must be functions'
            }

            args = await new Promise((resolve, reject) => {
                fn.call(this, ...args, function (err, ...data) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            })
        }

        cb(null)
    } catch (err) {
      cb(err)
    }
}

waterFall([
    function (callback){
        callback(null, 1, 2)
    },
    function (arg1, arg2, callback){
        console.log('arg1, arg2', arg1, arg2)
        callback(null, 3)
    },
    function (arg1, callback){
        console.log('arg1', arg1)
        callback(null)
    }
])








