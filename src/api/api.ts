type CustomFetchType = {
  endpoint: 'meters' | 'areas';
  method: 'GET' | 'POST' | 'DELETE';
  query: Record<string, string | string[]>;
  urlModification?: string;
};
export async function customFetch({
  endpoint,
  method,
  query,
  urlModification,
}: CustomFetchType) {
  const baseUrl = 'http://showroom.eis24.me/api/v4/test/';
  const queryParams = new URLSearchParams();

  const queryEntries = query;

  Object.keys(queryEntries).forEach((key) => {
    const value = queryEntries[key];
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  const url = `${baseUrl}${endpoint}${
    urlModification ? '/' + urlModification : '/'
  }?${queryString}`;
  console.log(url);

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  if (method === 'DELETE') {
    return response;
  }

  const data = await response.json();
  return data;
}
