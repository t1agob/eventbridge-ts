

export class LockOperation {
  'action': string;
  'lockId': string;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "action",
            "baseName": "action",
            "type": "string"
        },
        {
            "name": "lockId",
            "baseName": "lockId",
            "type": "string"
        }    ];

    public static getAttributeTypeMap() {
        return LockOperation.attributeTypeMap;
    }
}




