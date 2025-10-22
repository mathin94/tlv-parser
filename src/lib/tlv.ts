const isTwoDigitNum = (value: string): boolean => {
    return /^\d\d$/.test(value)
}

interface TLVObject {
    tag: string;
    length: number;
    value: string;
    children?: TLVObject[];
}

interface ParseResult {
    tlvs?: TLV[];
    ok: boolean;
}

interface TagLengthResult {
    tag?: string;
    len?: number;
    ok: boolean;
}

interface GetAsObjectsResult {
    result?: TLVObject[];
    ok: boolean;
}

class TLV {
    tag: string;
    length: number;
    value: string;
    hasChild: boolean;
    children: TLV[];

    constructor(tag: string, length: number, value: string) {
        this.tag = tag;
        this.length = length;
        this.value = value;
        const {tlvs, ok} = TLV.Parse(value);
        this.hasChild = ok;
        this.children = tlvs || [];
    }

    toObject(): TLVObject {
        const result: TLVObject = {
            tag: this.tag,
            length: this.length,
            value: this.value,
        }

        if (this.hasChild) {
            result.children = this.children.map((el) => el.toObject())
        }
        return result;
    }

    static getTagAndLength(s: string): TagLengthResult {
        if (s.length !== 4) {
            return {ok: false}
        }
       
        const tagStr = s.substring(0, 2);
        const lenStr = s.substring(2, 4);

        if (!isTwoDigitNum(tagStr) || !isTwoDigitNum(lenStr)){
            return {ok: false}
        }

        return {
            tag: tagStr,
            len: parseInt(lenStr),
            ok: true,
        };
    } 

    static Parse(rawText: string): ParseResult {
        const tlvs: TLV[] = []
        let ptr = 0;
        const rawLen = rawText.length;

        if (rawLen < 4) {
            return {ok: false};
        }

        while ((ptr + 4) <= rawLen) {
            const {tag, len, ok} = TLV.getTagAndLength(rawText.substring(ptr, ptr+4))
            if (!ok || !tag || len === undefined || (ptr + 4 + len) > rawLen) {
                return {ok: false};
            }

            const tlv = new TLV(tag, len, rawText.substring(ptr + 4, ptr + 4 + len))
            tlvs.push(tlv)
            ptr = ptr + 4 + len
        }

        return {
          tlvs: tlvs,
          ok: true,  
        };
    }

    static GetAsObjects(rawText: string): GetAsObjectsResult {
        const {tlvs, ok} = TLV.Parse(rawText)
        if (!ok || !tlvs) {
            return {ok: false};
        }
        return {result: tlvs.map((el) => el.toObject()), ok: true}
    }
}

export default TLV;
export type { TLVObject };
