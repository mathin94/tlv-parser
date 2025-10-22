import type { TLVObject } from './tlv';

interface ConvertResult {
    tlvString?: string;
    ok: boolean;
    error?: string;
}

interface ValidateResult {
    ok: boolean;
    data?: TLVObject | TLVObject[];
    error?: string;
}

class JSONToTLV {
    /**
     * Converts a single TLV object to TLV string format
     * @param tlvObj - Object with tag, length, and value properties
     * @returns TLV formatted string
     */
    static objectToTLV(tlvObj: TLVObject): string {
        let result = '';
        
        // Handle children if they exist
        let valueStr = tlvObj.value;
        if (tlvObj.children && tlvObj.children.length > 0) {
            valueStr = '';
            for (const child of tlvObj.children) {
                valueStr += JSONToTLV.objectToTLV(child);
            }
        }
        
        // Ensure tag is 2 digits
        const tag = String(tlvObj.tag).padStart(2, '0');
        
        // Calculate actual length from value
        const actualLength = valueStr.length;
        const length = String(actualLength).padStart(2, '0');
        
        result = tag + length + valueStr;
        
        return result;
    }

    /**
     * Converts JSON array of TLV objects to TLV string
     * @param json - Array of TLV objects or single TLV object or JSON string
     * @returns Object with {tlvString: string, ok: boolean}
     */
    static Convert(json: string | TLVObject | TLVObject[]): ConvertResult {
        try {
            let data: TLVObject | TLVObject[];
            
            // Parse if string, otherwise use as is
            if (typeof json === 'string') {
                data = JSON.parse(json) as TLVObject | TLVObject[];
            } else {
                data = json;
            }
            
            // Handle single object or array
            const tlvArray = Array.isArray(data) ? data : [data];
            
            let result = '';
            for (const tlvObj of tlvArray) {
                if (!tlvObj.tag || tlvObj.length === undefined || tlvObj.value === undefined) {
                    return {
                        ok: false,
                        error: 'Invalid TLV object structure. Each object must have tag, length, and value properties.'
                    };
                }
                result += JSONToTLV.objectToTLV(tlvObj);
            }
            
            return {
                tlvString: result,
                ok: true
            };
            
        } catch (error) {
            return {
                ok: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    /**
     * Validates and formats JSON before conversion
     * @param jsonString - JSON string to validate
     * @returns Validation result
     */
    static ValidateJSON(jsonString: string): ValidateResult {
        try {
            const parsed = JSON.parse(jsonString) as TLVObject | TLVObject[];
            return {
                ok: true,
                data: parsed
            };
        } catch (error) {
            return {
                ok: false,
                error: 'Invalid JSON: ' + (error instanceof Error ? error.message : 'Unknown error')
            };
        }
    }
}

export default JSONToTLV;
