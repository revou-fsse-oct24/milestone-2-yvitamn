



export default async function handler(req, res) {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();
    res.status(200).json(data);
  }