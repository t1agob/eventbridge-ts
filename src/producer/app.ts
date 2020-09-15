const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION || "us-east-1"
const eventbridge = new AWS.EventBridge()


exports.lambdaHandler = async (event:AWSLambda.APIGatewayEvent, 
            context: AWSLambda.APIGatewayEventRequestContext) => {
    
    var action = event.queryStringParameters["action"];
    var lockId = event.queryStringParameters["id"];

    let response;

    var lockEvent = {
            Entries: [
                {
                    Source: "custom.remoteLock",
                    EventBusName: "default",
                    DetailType: "lockOperation",
                    Time: new Date(),

                    // Main event body
                    Detail: JSON.stringify({
                        action: action,
                        lockId: lockId,
                    }),
                }
            ]
        }

    const result = await eventbridge.putEvents(lockEvent).promise()
    
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({'eventId': result})
        }
    } catch (err) {
        console.log(err)
        return err
    }
    return response
}
