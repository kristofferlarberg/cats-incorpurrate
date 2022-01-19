import catdata from "/data/catdata.json";

export default function handler(request, response) {
  const { method } = request;

  if (method === "GET") {
    return response.status(200).json(catdata);
  }

  if (method === "POST") {
    const { body } = request;
    catdata.push({ ...body, id: data.length + 1 });
    return response.status(200).json(catdata);
  }
}
