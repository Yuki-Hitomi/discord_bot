function info(message) {
  const timestamp = new Date().toISOString();
  console.info(`[${timestamp}] ${message}`);
}

function error(message) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ${message}`);
}

module.exports = { info, error };
