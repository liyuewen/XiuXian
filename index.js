const { createClient } = require('redis');
console.log(createClient);
try {
  let client = createClient({
    url: 'redis://43.142.50.90:6379',
  });
  console.log(client.get);
  client.get(String(2)).then((res) => {
    console.log(res);
  });
  client.on('on', (data) => {
    console.error(data);
  });
  
  client.on('error', (error) => {
    console.error(error);
  });
} catch (error) {
  console.error(error);
}
