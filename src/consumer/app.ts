import { AWSEvent } from "./schema/custom_remotelock/lockoperation/AWSEvent";
import { LockOperation } from "./schema/custom_remotelock/lockoperation/LockOperation";

// exports.lambdaHandler = (event:AWSLambda.EventBridgeEvent) => {
exports.lambdaHandler = (event: AWSEvent<LockOperation>) => {
  try {
    var result;
    if (event.detail.action == "lock") result = "locked";
    else result = "unlocked";

    console.log("remote lock with id " + event.detail.lockId + " is now " + result + ".");
  } catch (err) {
    console.log(err);
    return err;
  }
};
