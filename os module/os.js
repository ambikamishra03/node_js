var os = require('os');

console.log("Platform:",  os.platform());
console.log("Architecture:",  os.arch());
// console.log("Constants:",  os.constants); // return object of constants 
// console.log("CPU:",  os.cpus());  //cpu, array of objects
console.log("Endian:",  os.endianness());
console.log("Free memory:",  os.freemem());
console.log("Host name:",  os.hostname());
// console.log("Network interface:",  os.networkInterfaces());

console.log("User information:",  os.userInfo());




