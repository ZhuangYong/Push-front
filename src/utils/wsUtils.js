let socket;
let listener;
let session = {};
let ID_SEQ = 1;
let config = {listener: null, log: console};
const Command = {
    HANDSHAKE: 2,
    BIND: 5,
    UNBIND: 6,
    ERROR: 10,
    OK: 11,
    KICK: 13,
    PUSH: 15,
    GATEWAY_PUSH: 16,
    ACK: 23,
    UNKNOWN: -1
};

function iniWs() {
    listener = {
        onOpened: function (event) {
            if (config.listener !== null) {
                config.listener.onOpened(event);
            }
            handshake();
        },
        onClosed: function (event) {
            if (config.listener !== null) {
                config.listener.onClosed(event);
            }
            session = {};
            ID_SEQ = 1;
            socket = null;
        },
        onHandshake: function () {
            session.handshakeOk = true;
            if (config.listener !== null) {
                config.listener.onHandshake();
            }
            if (config.userId) {
                bindUser(config.userId, config.tags);
            }
        },
        onBindUser: function (success) {
            if (config.listener !== null) {
                config.listener.onBindUser(success);
            }
        },
        onReceivePush: function (message, messageId) {
            if (config.listener !== null) {
                config.listener.onReceivePush(message, messageId);
            }
        },
        onKickUser: function (userId, deviceId) {
            if (config.listener !== null) {
                config.listener.onKickUser(userId, deviceId);
            }
            doClose(-1, "kick user");
        }
    };
}

/**
 * 接入webSocket
 * @param url socket地址
 * @param userId 用户id
 * @param deviceId 设备id
 * @param onReceive 收到消息
 * @param onOpen 打开的时候
 * @param onClose 关闭的时候
 * @param onError 出错的时候
 */
export function conn(url, userId, deviceId, onReceive, onOpen, onClose, onError) {
    connWs({
        url: url,
        userId: userId,
        deviceId: deviceId,
        osName: "web " + navigator.userAgent,
        osVersion: "",
        clientVersion: "",
        onReceive: onReceive,
        onOpen: onOpen,
        onClose: onClose,
        onError: onError,
        log: console
    });
}

function connWs(cfg) {
    if (!listener) {
        iniWs();
    }
    config = copy(cfg);
    socket = new WebSocket(config.url);
    socket.onmessage = onReceive;
    socket.onopen = onOpen;
    socket.onclose = onClose;
    socket.onerror = onError;
    config.log.debug("try connect to web socket server, url=" + config.url);
}
export function Push(userId) {
    userId = userId || "user-4";
    const sessionId = ID_SEQ++;
    send({
        cmd: Command.GATEWAY_PUSH,
        //cmd: Command.PUSH,
        flags: 16,
        sessionId: sessionId,
        body: {
            // userId: "3c3cf52ccf882f55db3445524e60f10d",
            userId: userId,
            clientType: 1,
            timeout: 2500,
            content: JSON.stringify({
                content: "test msg to user:" + userId,
                nid: 1,
                ticker: "你有一条新的消息,请注意查收",
                title: "推送title",
                msgId: "msg_" + sessionId,
                msgType: 2
            })
        }
    });
}

export function bindUser(userId, tags) {
    console.log(userId, session);
    if (userId && userId !== session.userId) {
        session.userId = userId;
        session.tags = tags;
        send(Packet(Command.BIND, {userId: userId, tags: tags}));
    }
}
function Packet(cmd, body, sessionId) {
    return {
        cmd: cmd,
        flags: 16,
        sessionId: sessionId || ID_SEQ++,
        body: body
    };
}
function dispatch(packet) {
    switch (packet.cmd) {
        case Command.HANDSHAKE: {
            config.log.debug(">>> handshake ok.");
            listener.onHandshake();
            break;
        }
        case Command.OK: {
            if (packet.body.cmd === Command.BIND) {
                config.log.debug(">>> bind user ok.");
                listener.onBindUser(true);
            }
            break;
        }
        case Command.ERROR: {
            if (packet.body.cmd === Command.BIND) {
                config.log.debug(">>> bind user failure.");
                listener.onBindUser(false);
            }
            break;
        }
        case Command.KICK: {
            if (session.userId === packet.body.userId && config.deviceId === packet.body.deviceId) {
                config.log.debug(">>> receive kick user.");
                listener.onKickUser(packet.body.userId, packet.body.deviceId);
            }
            break;
        }
        case Command.PUSH: {
            config.log.debug(">>> receive push, content=" + packet.body.content);
            let sessionId;
            if ((packet.flags & 8) !== 0) {
                ack(packet.sessionId);
            } else {
                sessionId = packet.sessionId;
            }
            listener.onReceivePush(packet.body.content, sessionId);
            break;
        }
        default:
            console.log("---- un match cmd ----");
    }
}
function ack(sessionId) {
    send(Packet(Command.ACK, null, sessionId));
}

function send(message) {
    if (!socket) {
        return;
    }
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        config.log.error("The socket is not open.");
    }
}

function onReceive(event) {
    config.log.debug(">>> receive packet=" + event.data);
    config.onReceive(event);
    dispatch(JSON.parse(event.data));
}
function onOpen(event) {
    config.log.info("Web Socket opened!");
    config.onOpen(event);
    listener.onOpened(event);
}
function onClose(event) {
    config.log.info("Web Socket closed!");
    config.onClose(event);
    listener.onClosed(event);
}
function onError(event) {
    config.log.info("Web Socket receive, error");
    config.onError(event);
    doClose();
}
function doClose(code, reason) {
    if (socket) socket.close();
    config.log.info("try close web socket client, reason=" + reason);
}

function handshake() {
    send(Packet(Command.HANDSHAKE, {
            deviceId: config.deviceId,
            osName: config.osName,
            osVersion: config.osVersion,
            clientVersion: config.clientVersion
        })
    );
}

function copy(cfg) {
    for (let p in cfg) {
        if (cfg.hasOwnProperty(p)) {
            config[p] = cfg[p];
        }
    }
    return config;
}
