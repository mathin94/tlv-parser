import type { TLVObject } from '../lib/tlv';

export const samplePayload = "00020101021126610014COM.GO-JEK.WWW01189360091434630238780210G4630238780303URE51440014ID.CO.QRIS.WWW0215ID10190118844820303URE5204866153033605802ID5917Masjid Salman ITB6007Bandung61054013262070703A016304F72C";

export const sampleJSON: TLVObject[] = [
    {
        "tag": "00",
        "length": 2,
        "value": "01"
    },
    {
        "tag": "01",
        "length": 2,
        "value": "12"
    },
    {
        "tag": "26",
        "length": 37,
        "value": "0014COM.GO-JEK.WWW01189360091434630238780210G463023878",
        "children": [
            {
                "tag": "00",
                "length": 14,
                "value": "COM.GO-JEK.WWW"
            },
            {
                "tag": "01",
                "length": 18,
                "value": "936009143463023878"
            }
        ]
    }
];
