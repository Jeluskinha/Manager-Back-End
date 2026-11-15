export const atualizarVersãoProdutoQuimico = (str: string, tamanho = 3) => {
    const ultimos3 = str.slice(-tamanho); // Pega "001" (garantido)
    const numero = parseInt(ultimos3, 10) + 1; // 001 → 2
    const novoNumeroStr = String(numero).padStart(tamanho, "0"); // 2 → "002"
    return str.slice(0, -tamanho) + novoNumeroStr; // Substitui os últimos 3 dígitos
  }


  // versão base -> 120-7201-VS001
