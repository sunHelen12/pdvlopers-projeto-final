export const PointsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* 1. Total de Pontos */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Total de Pontos</h3>
        <p className="text-3xl font-bold">45.230</p>
        <p className="text-sm text-gray-500">Distribuídos entre todos os clientes</p>
      </div>

      {/* 2. Resgates do Mês */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Resgates do Mês</h3>
        <p className="text-3xl font-bold">127</p>
        <p className="text-sm text-red-500">-23% em relação ao mês anterior</p>
      </div>

      {/* 3. Clientes Ativos */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Clientes Ativos</h3>
        <p className="text-3xl font-bold">89</p>
        <p className="text-sm text-gray-500">Com pontos para resgatar</p>
      </div>

      {/* 4. Top Clientes por Pontos */}
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Cabeçalho */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Top Clientes por Pontos</h3>
          <p className="text-sm text-gray-500">Ranking dos clientes mais fiéis</p>
        </div>

        {/* Lista de Clientes */}
        <div className="space-y-4">
          {[
            { name: "João Silva", points: 1250, level: "VIP" },
            { name: "Maria Santos", points: 980, level: "Gold" },
            { name: "Pedro Costa", points: 875, level: "Gold" },
            { name: "Ana Oliveira", points: 720, level: "Silver" },
          ].map((client, index) => (
            <div key={client.name} className="flex items-center justify-between">

              {/* Lado esquerdo (Avatar + Nome + Nível) */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{client.name}</p>
                  <span className="inline-block px-2 py-1 text-xs border border-gray-200 rounded-md">
                    {client.level}
                  </span>
                </div>
              </div>

              {/* Lado direito (Pontos) */}
              <div className="text-right">
                <p className="font-medium">{client.points} pts</p>
              </div>
            </div>
            ))}
          </div>
      </div>

      {/* 5. Progresso de Níveis (ocupa toda a linha) */}
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Cabeçalho */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Progresso de Níveis</h3>
          <p className="text-sm text-gray-500">Distribuição dos clientes por nível</p>
        </div>

        {/* Barras de Progresso */}
        <div className="space-y-4">
          {/* Bronze */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Bronze (0-99 pts)</span>
              <span>45 clientes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>

          {/* Silver */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Silver (100-499 pts)</span>
              <span>32 clientes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-400 h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </div>

          {/* Gold */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Gold (500-999 pts)</span>
              <span>18 clientes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '18%' }}></div>
            </div>
          </div>

          {/* VIP */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>VIP (1000+ pts)</span>
              <span>5 clientes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '5%' }}></div>
            </div>
          </div>

        </div>

        
      </div>


    </div>
  );
};