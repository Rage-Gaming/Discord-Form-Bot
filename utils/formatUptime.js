function formatUptime(uptime) {
    const totalSeconds = Math.floor(uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
    const seconds = Math.floor(((totalSeconds % 86400) % 3600) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

module.exports = {
    formatUptime
};