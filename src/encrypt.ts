const crcTable = makeCRCTable();

export default function encrypt(str: string) {
  return crc32(str).toString(16);
}

function crc32(str: string) {
  let crc = 0 ^ -1;

  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xff];
  }

  return (crc ^ -1) >>> 0;
}

function makeCRCTable() {
  const crcTable: any[] = [];

  let c;

  for (let n = 0; n < 256; n++) {
    c = n;

    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }

    crcTable[n] = c;
  }

  return crcTable;
}
