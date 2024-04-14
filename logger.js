function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }
  
  module.exports = { log };

  function error(message) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ${message}`);
  }
  
  module.exports = { error };
