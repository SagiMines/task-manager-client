export const callAPI = async (
  route: RequestInfo,
  options?: RequestInit | undefined
) => {
  const req = await fetch(route, options);
  return req;
};
