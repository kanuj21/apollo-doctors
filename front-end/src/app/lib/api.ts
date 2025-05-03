const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchDoctors = async (queryParams: Record<string, string[] | string | number>) => {
  const queryString = new URLSearchParams();

  for (const key in queryParams) {
    const value = queryParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => queryString.append(key, v));
    } else {
      queryString.append(key, value.toString());
    }
  }

  const res = await fetch(`${BASE_URL}/doctors?${queryString.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch doctors');
  }

  return res.json();
};
