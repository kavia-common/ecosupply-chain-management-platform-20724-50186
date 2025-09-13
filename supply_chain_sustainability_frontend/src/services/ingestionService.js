const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// PUBLIC_INTERFACE
export async function ingestFromFile(file) {
  /** Simulates parsing uploaded file content. Accepts CSV/JSON text. */
  await sleep(600);
  const isJSON = file.type?.includes('json') || file.name.endsWith('.json');
  let records = [];
  try {
    if (isJSON) {
      records = JSON.parse(file.content);
    } else {
      // Very naive CSV parsing for demo: first row headers, comma-separated
      const [headerLine, ...lines] = file.content.split(/\r?\n/).filter(Boolean);
      const headers = headerLine.split(',').map(h => h.trim());
      records = lines.map(line => {
        const cols = line.split(',').map(x => x.trim());
        return headers.reduce((acc, h, idx) => (acc[h] = cols[idx], acc), {});
      });
    }
  } catch (e) {
    throw new Error('Failed to parse file content');
  }
  return { count: records.length, preview: records.slice(0, 5) };
}

// PUBLIC_INTERFACE
export async function ingestFromAPI(url) {
  /** Simulates fetching from external API endpoint. */
  await sleep(600);
  return { source: url, count: 42, preview: [{ id: 1, sample: true }] };
}
