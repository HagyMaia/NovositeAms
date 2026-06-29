/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... outras configurações que você já tem
  
  // Adicione esta linha para liberar o acesso pelo IP da sua rede
  allowedDevOrigins: ['192.168.0.10'],
}

export default nextConfig