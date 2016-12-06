global.Promise = require('bluebird')
const Docker = require('dockerode')

const docker = new Docker({
    socketPath: '/var/run/docker.sock'
})

docker.createContainer = Promise.promisify(docker.createContainer)

async function run() {
    try {
        // 创建容器
        // Image: 已经 pull 的镜像
        // Binds: 挂载目录
        const container = await docker.createContainer({
            Image: 'ruiming/gcc',
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Tty: true,
            Cmd: ['/bin/bash'],
            Binds: ['/home/ruiming/Desktop:/cpp']
        })
        container.start  = Promise.promisify(container.start)
        container.exec   = Promise.promisify(container.exec)
        container.stop   = Promise.promisify(container.stop)
        container.remove = Promise.promisify(container.remove)
        // 启动容器, 执行命令
        await container.start()
        const exec = await container.exec({
            Cmd: ["./cpp/main.o", "<", "./cpp/main.in"],
            AttachStdin: true,
            AttachStdout: true
        })
        exec.start   = Promise.promisify(exec.start)
        exec.inspect = Promise.promisify(exec.inspect)
        const stream = await exec.start({
            stdin: true,
            hijack: true
        })
        stream.setEncoding('utf8')
        stream.pipe(process.stdout)
        // 关闭容器
        await container.stop()
        await container.remove()
    } catch (e) {
        console.log(e)
    }
}

run()