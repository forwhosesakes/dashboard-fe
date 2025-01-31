import { FILE_FIELDS } from "~/routes/cp/users/constants/client-shared";



/*  Utils for processing the file fields contained in org data*/
export async function blobToBase64(blob: Blob) {
  const arrayBuffer = await blob.arrayBuffer();
  // let buffer = Buffer.from(await blob.arrayBuffer());
  const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  return base64String

  // const bytes = new Uint8Array(arrayBuffer);
  // return "data:" + blob.type + ';base64,' + buffer.toString('base64');
  // let binary = "";
  // const chunkSize = 1024;

  // for (let i = 0; i < bytes.length; i += chunkSize) {
  //   const chunk = bytes.slice(i, i + chunkSize);
  //   //@ts-ignore
  //   binary += String.fromCharCode.apply(null, chunk);
  // }

  // return btoa(binary);
}

export async function r2ObjectToBase64(key: string, context: any) {
  const r2Object: R2ObjectBody | null = await (
    context.cloudflare as any
  ).env.KEDAN_DASHBOARD_BUCKET.get(key);
  if (r2Object) {
    const blobObject = await r2Object?.blob();
    //convert the blob to base64 string
    const base64 = await blobToBase64(blobObject);
    return base64;
  } else return null;
}
export async function processFileField(field: string, data: any, context: any): Promise<any[]> {
  try {
    const rawValue = data[field];
    if (!rawValue) return [];

    let parsedValue;
    try {
      parsedValue = JSON.parse(rawValue);
    } catch {
      // If parsing fails, treat the raw value as a single file
      return [await r2ObjectToBase64(rawValue, context)];
    }

    // Handle array of files
    if (Array.isArray(parsedValue)) {
      return Promise.all(
        parsedValue.map(val => r2ObjectToBase64(val, context))
      );
    }

    // Handle single file
    return [await r2ObjectToBase64(parsedValue, context)];
  } catch (error) {
    console.error(`Error processing field ${field}:`, error);
    return [];
  }
}

export async function processFileFields(responseData: any, context: any) {
  await Promise.all(
    FILE_FIELDS.map(async field => {
      responseData[field] = await processFileField(field, responseData, context);
    })
  );
  return responseData;
}