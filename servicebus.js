const { ServiceBusClient } = require("@azure/service-bus");
const { DefaultAzureCredential } = require("@azure/identity");
const message = async (messageBody) => {
  const connectionString =
    "Endpoint=sb://datcservicebus11.servicebus.windows.net/;SharedAccessKeyName=SendOnly;SharedAccessKey=1lkVLowbwjA1rKyfdrQGohZCEDNKzgo7B+ASbLEml6s=;EntityPath=datcqueue11";
  const queueName = "datcqueue11";

  const sb = new ServiceBusClient(connectionString);
  const sender = sb.createSender(queueName);

  await sender.sendMessages({ body: messageBody });
  console.log("Queue sent message!");
};

module.exports = message;
